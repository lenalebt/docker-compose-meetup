package helpers

import org.scalatest.{ Args, Status, Suite, SuiteMixin }
import play.api.inject.guice.GuiceableModule
import play.api.{ ApplicationLoader, Environment, Play }

trait OneConfigurableAppPerSuite extends SuiteMixin { this: Suite =>
  val overrideBindings: Seq[GuiceableModule] = Seq.empty

  private val context: ApplicationLoader.Context = ApplicationLoader.createContext(Environment.simple())
  implicit lazy val app = new modules.ApplicationLoader(overrideBindings: _*).load(context)

  /**
    * Invokes `Play.start`, passing in the `Application` provided by `app`, and places
    * that same `Application` into the `ConfigMap` under the key `org.scalatestplus.play.app` to make it available
    * to nested suites; calls `super.run`; and lastly ensures `Play.stop` is invoked after all tests and nested suites have completed.
    *
    * @param testName an optional name of one test to run. If `None`, all relevant tests should be run.
    *                 I.e., `None` acts like a wildcard that means run all relevant tests in this `Suite`.
    * @param args the `Args` for this run
    * @return a `Status` object that indicates when all tests and nested suites started by this method have completed, and whether or not a failure occurred.
    */
  abstract override def run(testName: Option[String], args: Args): Status = {
    Play.start(app)
    try {
      val newConfigMap = args.configMap + ("org.scalatestplus.play.app" -> app)
      val newArgs = args.copy(configMap = newConfigMap)
      val status = super.run(testName, newArgs)
      status.whenCompleted { _ => Play.stop(app) }
      status
    } catch { // In case the suite aborts, ensure the app is stopped
      case ex: Throwable =>
        Play.stop(app)
        throw ex
    }
  }
}
