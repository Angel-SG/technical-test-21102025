import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Next.js + GraphQL — Technical Test</h1>
      <p>Go to the characters list to start the exercise.</p>
      <Link className="inline-block underline" href="/characters">Open /characters →</Link>
    </main>
  );
}
