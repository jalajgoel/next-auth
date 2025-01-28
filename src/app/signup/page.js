// app/signup/page.js
'use client'; // Marking this as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter from next/navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Send signup data to API
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Redirect to the login page on successful signup
      router.push('/login');
    } else {
      // Display error message from API response
      setError(data.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2>Sign Up</h2>
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
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
