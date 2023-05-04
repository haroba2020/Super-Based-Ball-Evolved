resource "docker_image" "api" {
    name = "api"
    build {
        context = "../server/"
        dockerfile = "Dockerfile"
        tag = ["sbbe-api:latest"]
    }
}

resource "docker_container" "api" {
    name = "sbbe-api"
    image = "sbbe-api:latest"

    env = [
        "REST_PORT=3000",
        "RTC_PORT=3001",
        "SIGNING_KEY=${var.api_signing_key}",
        "DB_URI=${var.api_db_uri}"
    ]
}
