terraform {
  required_providers {
    ssh = {
      source = "loafoe/ssh"
      version = "2.6.0"
    }
  }
}

resource "ssh_resource" "install-docker" {
  host         = "thugshaker.servers.sbbe.io"
  user         = "root"
  password     = var.thugshaker_password
  agent        = false

  when         = "create" # Default

  file {
    content     = file("${path.module}/scripts/docker.sh")
    destination = "/tmp/docker.sh"
    permissions = "0700"
  }

  commands = [
    "source /tmp/docker.sh",
  ]
}

output "result" {
  value = try(jsondecode(ssh_resource.install-docker.result), {})
}
