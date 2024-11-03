// src/pages/ProfilePage.js

import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const ProfilePage = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  if (!authState || !authState.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {authState.idToken?.claims.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
