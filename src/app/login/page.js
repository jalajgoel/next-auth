'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert('Failed to sign in');
    } else {
      window.location.href = '/protected';
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 my-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 my-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Log In
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Login with Google
        </button>
        <button
          onClick={() => signIn('facebook')}
          className="w-full bg-blue-500 text-white py-2 mt-2 rounded"
        >
          Login with Facebook
        </button>
      </div>
    </div>
  );
}
