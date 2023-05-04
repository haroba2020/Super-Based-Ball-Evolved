terraform {
  required_providers {
    ssh = {
      source = "loafoe/ssh"
      version = "2.6.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}
