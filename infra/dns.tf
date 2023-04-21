provider "cloudflare" {
  api_token = var.cloudflare_api_key
}

# Create a record
resource "cloudflare_record" "thugshaker_servers" {
  zone_id = var.cloudflare_zone_id
  name = "thugshaker.servers"
  value = var.server_thugshaker_ip
  type = "A"
}