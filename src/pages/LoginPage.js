// src/pages/LoginPage.js

import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const LoginPage = () => {
  const { oktaAuth } = useOktaAuth();

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  return (
    <div>
      <h2>Please log in to access the application</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
