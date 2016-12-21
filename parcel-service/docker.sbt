import com.typesafe.sbt.packager.docker.Cmd

// exposing the play ports
dockerExposedPorts in Docker := Seq(9000, 9443)

dockerBaseImage := "java:latest"

dockerExposedVolumes in Docker := Seq("/opt/docker/logs")

defaultLinuxInstallLocation in Docker := "/opt/docker"

// fix "no Permission in /opt/docker/PID"-error
javaOptions in Universal ++= Seq(
  "-Dpidfile.path=/tmp/play.pid"
)
