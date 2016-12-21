package modules

import com.typesafe.config.ConfigFactory
import play.api.ApplicationLoader.Context
import play.api.Mode._
import play.api.inject.guice.{ GuiceApplicationBuilder, GuiceApplicationLoader, GuiceableModule }
import play.api.{ Configuration, Environment, Logger }

class ApplicationLoader(overrideBindings: GuiceableModule*) extends GuiceApplicationLoader {
  def this() = this(Seq.empty: _*)

  override protected def builder(context: Context): GuiceApplicationBuilder = {
    val builder = initialBuilder.in(context.environment).overrides(overrides(context): _*)
    context.environment.mode match {
      case Prod =>
        // 'start' mode
        val prodMode = context.initialConfiguration.getString(
          "app.environment",
          validValues = Some(Set("integration", "local", "live"))
        ).getOrElse("integration")
        Logger.info(s"Application prod-mode is '$prodMode'")

        val prodConf = prodMode match {
          case "integration" => Configuration(ConfigFactory.parseResources(this.getClass.getClassLoader, "application.prod.integration.conf").resolve())
          case "local"       => Configuration(ConfigFactory.parseResources(this.getClass.getClassLoader, "application.prod.local.conf").resolve())
          case "live"        => Configuration(ConfigFactory.parseResources(this.getClass.getClassLoader, "application.prod.conf").resolve())
        }
        val cfg = context.initialConfiguration ++ prodConf
        scala.util.Try{ cfg.getString("play.http.errorHandler") } match {
          case scala.util.Success(Some(str)) =>
            Logger.info(s"Using error handler $str")
          case _ =>
            Logger.warn("Using default play error handler in production mode. Hint: override play.http.errorHandler in application.conf")
        }
        builder.loadConfig(cfg).bindings(new ProdModule(context.environment, cfg))
      case Dev =>
        // 'run' mode
        val devConf = Configuration(ConfigFactory.parseResources(this.getClass.getClassLoader, "application.test.conf").resolve())
        val cfg = context.initialConfiguration ++ devConf
        builder.loadConfig(cfg)
          .bindings(new DevModule(context.environment, cfg))
      case Test =>
        // 'test' mode
        val testConf = Configuration(ConfigFactory.parseResources(this.getClass.getClassLoader, "application.test.conf").resolve())
        val cfg = context.initialConfiguration ++ testConf
        builder.loadConfig(cfg)
          .bindings(GuiceableModule.guiceable(new TestModule(context.environment, cfg))).overrides(overrideBindings: _*)
    }
  }
}

class ProdModule(
    environment:   Environment,
    configuration: Configuration
) extends GuiceModule()(environment, configuration) {
  {
    Logger.info("starting application in prod-mode")
  }
}

class DevModule(
    environment:   Environment,
    configuration: Configuration
) extends GuiceModule()(environment, configuration) {
  {
    Logger.info("starting application in dev-mode")
  }
}

class TestModule(
    environment:   Environment,
    configuration: Configuration
) extends GuiceModule()(environment, configuration) {
  {
    Logger.info("starting application in test-mode")
  }
}
