'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

// app/page.js
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
      const token = localStorage.getItem('jwtToken')
      if(token) {
        router.push('/protected')
      }
    }, [router])
  return (
    <div className="container mx-auto py-8 flex text-black">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome To My Auth App</h1>&nbsp;
      <div className="text-center w-1 flex-1" >
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
      </div>
      <div className="text-center w-1 flex-1">
        <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</Link>
      </div>
    </div>
  );
}
