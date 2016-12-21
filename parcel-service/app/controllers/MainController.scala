package controllers

import javax.inject.Inject

import play.api.mvc._

/**
  * Main application trait. This is a trait to make it possible to mock away the OAuth calls.
  */
class MainController @Inject() extends Controller {
  /**
    * Heartbeat endpoint that allows everybody to see that the instance is up.
    */
  def heartbeat: Action[AnyContent] = Action {
    Ok("<3")
  }
}
