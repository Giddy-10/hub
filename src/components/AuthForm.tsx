'use client';

import React, { useState } from 'react';
import { AuthFormData } from '@/types/auth';

interface Props {
  isSignup?: boolean;
  onSubmit: (data: AuthFormData) => void;
}

const AuthForm: React.FC<Props> = ({ isSignup = false, onSubmit }) => {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>

      {isSignup && (
        <div className="mb-4">
          <label className="block">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        {isSignup ? 'Create Account' : 'Log In'}
      </button>
    </form>
  );
};

export default AuthForm;
