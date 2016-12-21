package db

import java.util.UUID

import akka.actor.{ Actor, ActorRef }
import db.ParcelDeliverer.GetStatus
import db.ParcelStorage._
import dto.Parcel
import akka.pattern.ask
import akka.util.Timeout

import scala.collection.mutable
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.language.postfixOps

/**
  * Storage actor for parcels
  */
class ParcelStorage extends Actor {
  implicit val timeout = Timeout(3 seconds)
  val storageMap: mutable.Map[UUID, (Parcel, ActorRef)] = mutable.Map.empty

  override def receive: Receive = {
    case StoreParcel(parcel) =>
      val id = UUID.randomUUID()
      storageMap(id) = (parcel, context.actorOf(ParcelDeliverer.props(id)))
      sender() ! ParcelStored(id)
    case ReadParcel(id) =>
      val originalSender = sender
      (for { (parcel, deliverer) <- storageMap.get(id) } yield {
        (deliverer ? GetStatus).mapTo[ParcelDeliverer.State].map{ state =>
          originalSender ! Some(Tuple2(parcel, state))
        }
      }).getOrElse(originalSender ! None)
    case ReadParcels =>
      val originalSender = sender
      val elements = for { (id, (parcel, deliverer)) <- storageMap } yield {
        (deliverer ? GetStatus).mapTo[ParcelDeliverer.State].map{ state =>
          (id, parcel, state)
        }
      }
      Future.sequence(elements).map(originalSender ! _.toList)
    case DeleteParcel(id) =>
      storageMap.remove(id)
  }
}

object ParcelStorage {
  sealed trait ParcelMessages
  case class StoreParcel(parcel: Parcel) extends ParcelMessages
  case class ParcelStored(id: UUID) extends ParcelMessages
  case class ReadParcel(id: UUID) extends ParcelMessages
  case object ReadParcels extends ParcelMessages
  case class DeleteParcel(id: UUID) extends ParcelMessages
  case object Done extends ParcelMessages
  case object Failed extends ParcelMessages
}
