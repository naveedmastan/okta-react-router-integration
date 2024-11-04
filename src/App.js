// src/App.js

import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { Security, LoginCallback, useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './oktaConfig';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage'; // Import your LoginPage component

const oktaAuth = new OktaAuth(oktaConfig);

const ProtectedRoute = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/okta-redirecturl/login/login.html" />;
};

// Router setup with protected routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  { path: '/okta-redirecturl/login/login.html', element: <LoginPage /> }, // Login page with Okta widget
  { path: '/login/callback', element: <LoginCallback /> },
]);

function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || '/okta-redirecturl/login/login.html');
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <RouterProvider router={router} />
    </Security>
  );
}

export default App;
