organization := "de.zalando.paymentprocessing"

name := """parcel-service"""

Defaults.itSettings

lazy val root = (project in file(".")).enablePlugins(PlayScala).configs(IntegrationTest)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  json,
  jdbc, //only for services with db connection
  cache,
  ws,
  filters,
  "com.github.tototoshi" %% "play-json-naming" % "1.1.0",
  "org.typelevel" %% "cats" % "0.8.1"
)

//Test dependencies
libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "2.2.6",
  "org.scalacheck" %% "scalacheck" % "1.12.5"
) map (_ % "test")

// we should consider using '-Xfatal-warnings' to be very strict
scalacOptions ++= Seq(
  "-encoding", "UTF-8" // yes, this is 2 args
)

// We should add the pier one URL to enable direct publishing of images
// setting a maintainer which is used for all packaging types</pre>
maintainer := "team-kohle@zalando.de"
