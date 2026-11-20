
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10233F] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#345071] bg-[#1B3658] p-8 text-center shadow-xl sm:p-10">
        <Link href="/" className="mb-8 inline-block text-sm font-medium text-blue-400 transition hover:text-blue-300">
          ← Back to Home
        </Link>

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <ShieldAlert size={42} className="text-red-400" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">Access Forbidden</h1>

        <p className="mb-8 text-sm leading-6 text-gray-300">
          You do not have permission to view this page. Please return to your dashboard or go back home.
        </p>

        <Link href="/" className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
