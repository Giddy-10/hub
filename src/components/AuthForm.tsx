'use client';

import React, { useState } from 'react';
import { AuthFormData } from '@/types/auth';

interface AuthFormProps {
  isSignup?: boolean;
  onSubmit: (data: AuthFormData) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false, onSubmit }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 border rounded space-y-4">
      <h2 className="text-xl font-semibold text-center">{isSignup ? 'Sign Up' : 'Log In'}</h2>

      {isSignup && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>
    </form>
  );
};

export default AuthForm;
