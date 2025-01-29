/* eslint-disable @next/next/no-html-link-for-pages */
'use client'; // <-- Mark this as a client component

import './globals.css'; // Global CSS
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for internal navigation

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if the user is logged in by checking the JWT token
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       // Make an API call to check if the token is valid
  //       const res = await fetch('/api/check-auth', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (res.ok) {
  //         const user = await res.json();
  //         setUser(user);
  //       } else {
  //         setUser(null);
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    setUser(null); // Reset user state
    router.push('/login'); // Redirect to login page
  };

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="p-4 bg-blue-600 text-white">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">My Auth App</Link>
            <div>
              {user ? (
                <>
                  <span className="mr-4">Welcome, {user.name}</span>
                  <button 
                    className="text-white"
                    onClick={handleLogout} // Trigger logout
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-white">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
