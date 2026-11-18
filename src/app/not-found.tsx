import Link from "next/link";
import { Wrench, House } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#02112f] px-4 text-center">
      {/* Illustration */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600/15">
        <Wrench size={55} className="rotate-45 text-blue-400" />
      </div>

      <h1 className="text-7xl font-extrabold text-blue-500 sm:text-8xl">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <House size={19} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;