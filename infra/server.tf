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

  commands = [
    "apt install -y dos2unix",
    "dos2unix /tmp/docker.sh",
    "source /tmp/docker.sh",
  ]
}

output "result" {
  value = try(jsondecode(ssh_resource.thugshaker_docker.result), {})
}
