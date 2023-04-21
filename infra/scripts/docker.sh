# Repos
apt update
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings

# GPG key
rm /etc/apt/keyrings/docker.gpg # Remove previous
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

# Install
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
