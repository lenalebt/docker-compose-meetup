package modules

import com.google.inject.AbstractModule
import play.api.{ Configuration, Environment }

/**
  * Guice-configuration for Play (dependency injection).
  */
class GuiceModule(implicit
  environment: Environment,
                  configuration: Configuration) extends AbstractModule {
  override def configure(): Unit = {

  }
}
