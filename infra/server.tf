resource "ssh_resource" "thugshaker_docker" {
  host         = "thugshaker.servers.sbbe.io"
  user         = "root"
  password     = var.server_thugshaker_ip
  agent        = false
  timeout      = "60m"

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
  value = try(jsondecode(ssh_resource.thugshaker_docker.result), {})
}
