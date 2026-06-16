"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-sm text-gray-400 mb-2">500</p>
      <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          Try again
        </button>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ← Home
        </Link>
      </div>
    </main>
  );
}
