import Link from "next/link";
import { ShieldAlert, Home, LogIn } from "lucide-react";

export default function Unauthorizedpage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10233F] px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg rounded-2xl border border-[#345071] bg-[#1B3658] p-6 text-center shadow-xl sm:p-10">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300">
          <Home size={16} />
          Back to Home
        </Link>

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15">
          <ShieldAlert size={40} className="text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Access Denied!
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-gray-300 sm:text-base">
          Sorry, you don't have permission to access this page. Please sign in with an authorized account or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            <Home size={17} />
            Go to Home
          </Link>

          <Link href="/sign-in" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#45617F] bg-[#264669] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#345071]">
            <LogIn size={17} />
            Sign In
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          FixMate · Smart Repair Service Platform
        </p>
      </div>
    </main>
  );
}