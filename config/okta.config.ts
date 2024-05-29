// config/okta.config.ts
const oktaConfig = {
    clientId: '0oaenzv0b9gyT9J90697',
    issuer: 'https://trial-8975279.okta.com/oauth2/default',
    redirectUri: `${typeof window !== 'undefined' ? window.location.origin : ''}/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  };
  
  export default oktaConfig;
  