package controllers

import java.util.UUID

import de.zalando.paymentprocessing.actions.{ Auth, FakeAuthFactory }
import de.zalando.paymentprocessing.module.FakeAuthModule
import helpers.OneConfigurableAppPerSuite
import org.scalatest.concurrent.ScalaFutures
import org.zalando.hutmann.authentication.User
import play.api.http.Status._
import play.api.inject._
import play.api.inject.guice.GuiceableModule
import play.api.test.FakeRequest
import spec.UnitSpec

class MainControllerTest extends UnitSpec with OneConfigurableAppPerSuite with ScalaFutures {
  override val overrideBindings: Seq[GuiceableModule] = Seq(
    new FakeAuthModule,
    bind[Auth].to(app.injector.instanceOf(classOf[FakeAuthFactory]).create(Right(User(UUID.randomUUID().toString, Map.empty, "/services", "Bearer", 500, uid = Some("my-service")))))
  )

  /**
    * Creates a new Application instance that thinks all calls come from `user`.
    */
  def application = app.injector.instanceOf(classOf[MainController])

  "An Application" should "answer with OK" in {
    whenReady(application.index(FakeRequest())){
      _.header.status shouldBe OK
    }
  }
}
