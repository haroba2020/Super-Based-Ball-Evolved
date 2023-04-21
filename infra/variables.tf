# Servers
## Thugshaker
variable "server_thugshaker_password" {
    type = string
}

variable "server_thugshaker_ip" {
    type = string
}
### SSH keys
variable "server_thugshaker_ssh_public" {
    type = string
}
variable "server_thugshaker_ssh_private" {
    type = string
}

# Api
variable "api_signing_key" {
    type = string
}
variable "api_db_uri" {
    type = string
}

# Cloudflare
variable "cloudflare_api_key" {
    type = string
}

variable "cloudflare_zone_id" {
    type = string
}
