// src/App.js

import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { Security, LoginCallback, useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './oktaConfig';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

const oktaAuth = new OktaAuth(oktaConfig);

// ProtectedRoute component to redirect unauthenticated users to login
const ProtectedRoute = () => {
  const { authState } = useOktaAuth();
  
  if (!authState) {
    // Still loading authState
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Router setup with protected routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />, // Ensures all routes are protected
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/login/callback', element: <LoginCallback /> },
]);

function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || '/');
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <RouterProvider router={router} />
    </Security>
  );
}

export default App;
