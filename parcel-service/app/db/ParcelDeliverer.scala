package db

import java.util.UUID

import akka.actor.{ Actor, PoisonPill, Props }
import akka.event.LoggingReceive
import db.ParcelDeliverer._
import db.ParcelStorage.DeleteParcel

import scala.concurrent.duration._
import scala.util.Random

/**
  * Actor that keeps track of the state of a parcel, no matter what it's contents are.
  */
class ParcelDeliverer(val parcelId: UUID) extends Actor {
  import context._

  /**advance randomly in some time between 4 and 20 seconds*/
  //scalastyle:off magic.number
  def advanceRandom(): Unit = system.scheduler.scheduleOnce((4000 + Random.nextInt(16000)).millis, self, Advance)
  //scalastyle:on magic.number
  advanceRandom()

  override def receive: Receive = accepted

  def accepted: Receive = LoggingReceive {
    case GetStatus => sender ! Accepted
    case Advance =>
      advanceRandom()
      become(inDelivery)
  }

  def inDelivery: Receive = LoggingReceive {
    case GetStatus => sender ! InDelivery
    case Advance =>
      advanceRandom()
      become(delivered)
  }
  def delivered: Receive = LoggingReceive {
    case GetStatus => sender ! Delivered
    case Advance =>
      parent ! DeleteParcel(parcelId)
      self ! PoisonPill
  }
}

object ParcelDeliverer {
  sealed trait State
  case object Delivered extends State
  case object InDelivery extends State
  case object Accepted extends State
  case object GetStatus
  case object Advance

  def props(parcelId: UUID): Props = Props(new ParcelDeliverer(parcelId))
}
