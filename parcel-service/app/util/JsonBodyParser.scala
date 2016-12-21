package util

import akka.stream.scaladsl.{ Flow, Keep, Sink }
import akka.util.ByteString
import play.api.libs.json.{ Json, Reads }
import play.api.libs.streams.Accumulator
import play.api.mvc.{ BodyParser, RequestHeader, Result, Results }

import scala.concurrent.{ ExecutionContext, Future }
import scala.util.{ Failure, Success, Try }

/**
  * A body parser that takes JSON input and returns it as a parsed case class, or directly returning BAD REQUEST in case it's not a valid JSON.
  */
class JsonBodyParser[T](implicit ec: ExecutionContext, reads: Reads[T]) extends BodyParser[T] {
  override def apply(rh: RequestHeader): Accumulator[ByteString, Either[Result, T]] = {
    val sink: Sink[ByteString, Future[Either[play.api.mvc.Result, T]]] = Flow[ByteString]
      .map { data =>
        Try(Json.parse(data.utf8String)).map(_.as[T]) match {
          case Success(value) => Right(value)
          case Failure(ex)    => Left(Results.BadRequest(ex.toString))
        }
      }
      .toMat(Sink.head)(Keep.right)
    Accumulator(sink)
  }
}

object JsonBodyParser {
  def to[T](implicit ec: ExecutionContext, reads: Reads[T]): JsonBodyParser[T] = new JsonBodyParser[T]
}
