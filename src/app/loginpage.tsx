'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { AuthFormData } from '@/types/auth';

const LoginPage: React.FC = () => {
  const handleLogin = async (data: AuthFormData) => {
    try {
      const res = await fetch('https://hub-backend-qtb7.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.detail || 'Login failed');

      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      alert('Login successful!');
      window.location.href = '/';
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
