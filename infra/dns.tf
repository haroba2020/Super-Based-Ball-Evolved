provider "cloudflare" {
  api_token = var.cloudflare_api_key
}

resource "cloudflare_record" "thugshaker_servers" {
  zone_id = var.cloudflare_zone_id
  name = "thugshaker.servers"
  value = var.server_thugshaker_ip
  type = "A"
}

resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name = "api"
  value = var.server_thugshaker_ip
  type = "A"
  proxied = true
}

resource "cloudflare_record" "rtc" {
  zone_id = var.cloudflare_zone_id
  name = "rtc"
  value = var.server_thugshaker_ip
  type = "A"
  proxied = true
}
