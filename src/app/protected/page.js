'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ensure useEffect runs only on the client side.
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const jwtToken = localStorage.getItem('jwtToken'); // Get token from localStorage

      if (!token && !jwtToken) {
        router.push('/login'); // Redirect to login if no token
        return;
      }

      const res = await fetch('/api/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token || jwtToken}`, // Attach token in the header
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user); // Set user data
        setLoading(false);
      } else {
        router.push('/login'); // Redirect to login if unauthorized
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Protected Page</h2>
        <p>Welcome, {user?.name}!</p> {/* Safely check user data */}
        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
