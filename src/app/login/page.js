'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import NextAuth's signIn method
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('jwtToken', data.token);
      router.push('/protected'); // Redirect to protected page after login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    const result = await signIn('google', { callbackUrl: '/protected' });
    if (result?.ok) {
      router.push('/protected'); // Redirect to protected page after Google login
    }
  };

  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    const result = await signIn('facebook', { callbackUrl: '/protected' });
    if (result?.ok) {
      router.push('/protected'); // Redirect to protected page after Facebook login
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if(token) {
      router.push('/protected')
    }
  }, [])

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="flex items-center justify-center my-4">
        <span className="text-gray-600">OR</span>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Login with Google
      </button>
      <button
        onClick={handleFacebookLogin}
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
      >
        Login with Facebook
      </button>
      <Link href="/signup">Signup</Link>
    </div>
  );
}
