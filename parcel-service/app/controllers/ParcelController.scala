package controllers

import java.util.UUID
import javax.inject.{ Inject, Singleton }

import akka.actor.{ ActorSystem, Props }
import akka.pattern.ask
import akka.util.Timeout
import db.{ ParcelDeliverer, ParcelStorage }
import db.ParcelStorage.{ ParcelStored, ReadParcel, ReadParcels, StoreParcel }
import dto.Parcel
import play.api.libs.json.Json
import play.api.mvc.{ Action, Controller, RequestHeader }
import util.JsonBodyParser

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.language.postfixOps

/**
  * This one sends out the parcels.
  */
@Singleton
class ParcelController @Inject() (system: ActorSystem) extends Controller {
  lazy val parcelStorage = system.actorOf(Props[ParcelStorage])
  implicit val timeout = Timeout(5 seconds)

  def originalLocation(request: RequestHeader): String = {
    val protocol = if (request.secure) "https://" else "http://"
    s"$protocol${request.host}${request.path}"
  }

  def sendParcel(): Action[Parcel] = Action.async(JsonBodyParser.to[Parcel]) { request =>
    (parcelStorage ? StoreParcel(request.body)).mapTo[ParcelStored] map {
      case ParcelStored(newParcelId) =>
        Created.withHeaders(LOCATION -> s"${originalLocation(request)}/$newParcelId")
    }
  }

  def getParcel(id: UUID): Action[Unit] = Action.async(parse.empty) { request =>
    for { result <- (parcelStorage ? ReadParcel(id)).mapTo[Option[(Parcel, ParcelDeliverer.State)]] } yield {
      result match {
        case Some((parcel, state)) => Ok(Json.toJson((id, parcel, state)))
        case None                  => NotFound
      }
    }
  }

  def getParcels: Action[Unit] = Action.async(parse.empty) { request =>
    (parcelStorage ? ReadParcels).mapTo[Seq[(UUID, Parcel, ParcelDeliverer.State)]] map { parcels =>
      Ok(Json.toJson(parcels))
    }
  }
}
