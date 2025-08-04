'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { AuthFormData } from '@/app/types/auth';

const SignupPage = () => {
  const handleSignup = async (data: AuthFormData) => {
    console.log('Signing up with:', data);
    // TODO: Replace with API call (e.g., fetch('/api/signup', {...}))
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isSignup onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
