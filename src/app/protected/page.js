'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Protected() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If the session is loading, show loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If there is no session, redirect to login
  if (!session) {
    router.push('/login');
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <p>You are logged in as {session.user.email}</p>
    </div>
  );
}
