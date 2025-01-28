// app/layout.js
'use client';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider from next-auth

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {/* This wraps all your content to provide session context */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
