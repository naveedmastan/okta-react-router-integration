// src/oktaConfig.js

export default {
  clientId: '0oa1abcdXYZ1234abcd5', // Replace with your actual Client ID from Okta
  issuer: 'https://dev-123456.okta.com/oauth2/default', // Replace with your Okta domain
  redirectUri: window.location.origin + '/login/callback', // Ensure this matches your Okta app settings
  scopes: ['openid', 'profile', 'email'],
  pkce: true, // Use PKCE for security
};
