import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { useAuth } from './store/useAuth';
import { initializeStorage } from './services/storage';

export default function App() {
  const initAuth = useAuth((state) => state.initAuth);

  useEffect(() => {
    initializeStorage();
    initAuth();
  }, [initAuth]);

  return <RouterProvider router={router} />;
}
