// src/pages/LoginPage.js

import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from '@okta/okta-signin-widget';
//import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';


const LoginPage = () => {
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    const widget = new OktaSignInWidget({
      baseUrl: 'https://{yourOktaDomain}', // Replace with your Okta domain
      clientId: '{clientId}', // Replace with your client ID
      redirectUri: 'http://localhost:8080/okta-redirecturl/login/login.html', // Match the redirect URI configured in Okta
      authParams: {
        issuer: 'default', // or your specific issuer if not using the default
        scopes: ['openid', 'profile', 'email'],
      },
      // Add any other configuration options here
    });

    widget.renderEl(
      { el: '#widget-container' }, // Where to render the widget
      (response) => {
        if (response.status === 'SUCCESS') {
          // Handle successful login
          oktaAuth.handleLoginRedirect(response);
        }
      },
      (error) => {
        console.error('Widget error:', error);
      }
    );

    // Cleanup the widget on unmount
    return () => {
      widget.remove();
    };
  }, [oktaAuth]);

  return (
    <div>
      <h2>Please log in to access the application</h2>
      <div id="widget-container" />
    </div>
  );
};

export default LoginPage;
