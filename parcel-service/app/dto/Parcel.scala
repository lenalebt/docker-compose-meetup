package dto

import java.util.UUID

import com.github.tototoshi.play.json.JsonNaming
import db.ParcelDeliverer
import db.ParcelDeliverer.{ Accepted, Delivered, InDelivery }
import play.api.libs.json._

case class ParcelContent(`type`: String, content: String)
object ParcelContent {
  implicit val format = JsonNaming.snakecase(Json.format[ParcelContent])
}

case class Address(
  street:      String,
  houseNumber: String,
  zipCode:     String,
  city:        String
)
object Address {
  implicit val format = JsonNaming.snakecase(Json.format[Address])
}

case class Person(
  firstName: String,
  lastName:  String,
  address:   Address
)
object Person {
  implicit val format = JsonNaming.snakecase(Json.format[Person])
}

/**
  * A typical parcel that can be sent out
  */
case class Parcel(
  recipient: Person,
  sender:    Person,
  content:   ParcelContent
)

object Parcel {
  implicit val format = JsonNaming.snakecase(Json.format[Parcel])
  implicit val writesWithIdAndState = new Writes[(UUID, Parcel, ParcelDeliverer.State)] {
    override def writes(o: (UUID, Parcel, ParcelDeliverer.State)): JsValue = {
      o match {
        case (id, parcel, state) =>
          Json.obj("id" -> id, "state" -> JsString(state match {
            case Accepted   => "accepted"
            case Delivered  => "delivered"
            case InDelivery => "in_delivery"
          })) deepMerge Json.toJson(parcel).as[JsObject]
      }
    }
  }
}
