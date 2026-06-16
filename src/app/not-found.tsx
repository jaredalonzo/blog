import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-sm text-gray-400 mb-2">404</p>
      <h1 className="text-2xl font-semibold mb-4">Page not found</h1>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
        ← Home
      </Link>
    </main>
  );
}
