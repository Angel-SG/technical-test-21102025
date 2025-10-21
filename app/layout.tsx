import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tech Test — Next.js + GraphQL',
  description: 'Rick & Morty technical test with Next.js and GraphQL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
