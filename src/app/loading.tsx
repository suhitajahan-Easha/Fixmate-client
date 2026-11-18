import Link from "next/link";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#02112f] px-4">
      {/* Loading Spinner */}
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-900 border-t-blue-500"></div>

      <h2 className="mt-6 text-xl font-bold text-white">
        Loading FixMate...
      </h2>

      <p className="mt-2 text-center text-sm text-gray-400">
        Please wait while we prepare your page.
      </p>

      {/* Skeleton */}
      <div className="mt-8 w-full max-w-sm space-y-3">
        <div className="h-4 animate-pulse rounded bg-[#1E3152]"></div>
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#1E3152]"></div>
        <div className="h-24 animate-pulse rounded-lg bg-[#1E3152]"></div>
      </div>

      <Link
        href="/"
        className="mt-8 rounded-lg border border-blue-500 px-5 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Loading;