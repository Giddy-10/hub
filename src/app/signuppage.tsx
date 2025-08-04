'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { AuthFormData } from '@/types/auth';

const SignupPage: React.FC = () => {
  const handleSignup = async (data: AuthFormData) => {
    try {
      const res = await fetch('https://hub-backend-qtb7.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.detail || 'Signup failed');

      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      alert(`Account created for ${result.user.username}`);
      window.location.href = '/';
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isSignup onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
