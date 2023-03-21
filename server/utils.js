function getAuthenticationInfo(token) {
    return jwt.verify({email}, SIGNING_KEY);
}
