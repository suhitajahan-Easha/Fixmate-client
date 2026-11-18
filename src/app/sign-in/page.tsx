
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const email = formEntries.email as string;
    const password = formEntries.password as string;

    const validationErrors: string[] = [];

    if (!email.trim()) validationErrors.push("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.push("Enter a valid email address.");
    if (!password) validationErrors.push("Password is required.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Signed in successfully!");

      // Get the user's role from the returned session.
      const role = data?.user?.role;

      // Redirect to the requested page or the user's dashboard.
      const redirectTo = searchParams.get("callbackURL");

      const dashboard =
        role === "admin"
          ? "/dashboard/admin"
          : role === "technician"
            ? "/dashboard/technician"
            : "/dashboard/customer";

      const safeRedirect =
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : dashboard;

      router.push(safeRedirect);
    // router.push('/');
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue to FixMate.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" name="email" type="email" required placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" required placeholder="Enter your password" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          {errors.map((error, index) => <p key={index} className="text-sm text-red-500">{error}</p>)}

          <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-blue-600 hover:text-blue-700">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
