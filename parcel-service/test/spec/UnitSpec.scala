package spec

import org.scalatest.concurrent.ScalaFutures
import org.scalatest.time.{ Seconds, Span, Millis }
import org.scalatest.{ FlatSpec, Matchers }

/**
  * Trait for all unit tests
  */
trait UnitSpec extends FlatSpec with Matchers with ScalaFutures {
  implicit val defaultPatience = PatienceConfig(timeout = Span(5, Seconds), interval = Span(50, Millis))
}
