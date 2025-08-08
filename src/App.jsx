import React, { useState } from 'react';
import { useAppData } from './context/AppContext';
import LoginPage from './components/pages/LoginPage';
import AppLayout from './components/AppLayout';

export default function App() {
  const { activeUser, login, logout } = useAppData();

  if (!activeUser) {
    // # INTEGRATE: The `login` function here would be replaced with your actual authentication flow
    // (e.g., calling an auth API, setting a JWT token, and then setting the user state).
    return <LoginPage onLogin={login} />;
  }

  return <AppLayout user={activeUser} onLogout={logout} />;
}