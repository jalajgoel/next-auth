'use client';
import { useSession } from 'next-auth/react'; // Import useSession hook
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function HomePage() {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter(); // Get the router object for navigation

  // If the session is loading, show loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If the user is logged in, redirect to the protected page
  if (session) {
    router.push('/protected'); // Redirect the user to the protected page
    return <div>Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
        <p className="text-lg mb-6 text-gray-600">
          This is the homepage of your Next.js app. Use the navigation links to explore the features.
        </p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Signup
          </a>
          <a
            href="/login"
            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
