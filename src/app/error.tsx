"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, House } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ reset }: ErrorProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#02112f] px-4 text-center">
      {/* Error Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-yellow-500/10">
        <AlertTriangle size={55} className="text-yellow-400" />
      </div>

      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Something Went Wrong!
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
        Sorry, we couldn't load this page. An unexpected error occurred.
        Please try again.
      </p>

      {/* Try Again Button */}
      <button
        onClick={reset}
        className="mt-8 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <RefreshCw size={18} />
        Try Again
      </button>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 rounded-lg border border-blue-500 px-6 py-3 font-semibold text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        <House size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;