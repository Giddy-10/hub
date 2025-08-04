'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { AuthFormData } from '@/app/types/auth';

const LoginPage = () => {
  const handleLogin = async (data: AuthFormData) => {
    console.log('Logging in with:', data);
    // TODO: Replace with API call (e.g., fetch('/api/login', {...}))
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
