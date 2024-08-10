export const oktaConfig = {
    clientId: '0oaitmk60sj02qkKH5d7',
    issuer: 'https://dev-94360918.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}