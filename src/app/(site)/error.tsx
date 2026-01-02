"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900">Something went wrong!</h1>
          <p className="text-lg text-gray-600">
            We&apos;re sorry, but something unexpected happened. Please try again.
          </p>
        </div>

        {error && (
          <div className=" bg-red-50 border border-red-200 p-4 text-left">
            <p className="text-sm font-medium text-red-800 mb-1">Error Details:</p>
            <p className="text-xs text-red-600 break-all">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center  bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center  border-2 border-brand-300 bg-white px-6 py-3 text-sm font-bold text-brand-600 transition-all duration-200 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
