resource "ssh_resource" "thugshaker_docker" {
  host         = var.server_thugshaker_ip
  user         = "root"
  password     = var.server_thugshaker_password
  agent        = false

  when         = "create" # Default

  file {
    content     = file("${path.module}/scripts/docker.sh")
    destination = "/tmp/docker.sh"
    permissions = "0700"
  }
  file {
    content = var.server_thugshaker_ssh_public
    destination = "/root/.ssh/authorized_keys"
  }

  commands = [
    "apt install -y dos2unix",
    "dos2unix /tmp/docker.sh",
    "source /tmp/docker.sh",
  ]
}


provider "docker" {
    host = "ssh://root@${var.server_thugshaker_ip}:22"
    ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"]
}

output "result" {
  value = try(jsondecode(ssh_resource.thugshaker_docker.result), {})
}
