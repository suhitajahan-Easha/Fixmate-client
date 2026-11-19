"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const name = formEntries.name as string;
    const email = formEntries.email as string;
    const password = formEntries.password as string;
    const role = formEntries.role as "customer" | "technician";

    const passwordErrors: string[] = [];

    if (password.length < 6)
      passwordErrors.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      passwordErrors.push("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(password))
      passwordErrors.push("Password must contain a lowercase letter.");

    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/sign-in",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");

      // router.push(role === "technician" ? "/dashboard/technician" : "/dashboard/customer");
      router.push("/sign-in");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
    //   <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    //     <div className="mb-7 text-center">
    //       <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
    //       <p className="mt-2 text-sm text-gray-500">Join FixMate and get started today.</p>
    //     </div>

    //     <form onSubmit={handleSignUp} className="space-y-5">
    //       <div>
    //         <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
    //         <input id="name" name="name" type="text" required placeholder="Enter your full name" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    //       </div>

    //       <div>
    //         <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
    //         <input id="email" name="email" type="email" required placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    //       </div>

    //       <div>
    //         <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
    //         <input id="password" name="password" type="password" required placeholder="Create a password" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    //         <p className="mt-2 text-xs text-gray-500">At least 6 characters, one uppercase and one lowercase letter.</p>
    //         {errors.map((error, index) => <p key={index} className="mt-1 text-xs text-red-500">{error}</p>)}
    //       </div>

    //       <div>
    //         <p className="mb-3 text-sm font-medium text-gray-700">Select Your Role</p>
    //         <div className="grid grid-cols-2 gap-3">
    //           <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
    //             <input type="radio" name="role" value="customer" defaultChecked className="accent-blue-600" />
    //             <span className="text-sm font-medium text-gray-700">Customer</span>
    //           </label>
    //           <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
    //             <input type="radio" name="role" value="technician" className="accent-blue-600" />
    //             <span className="text-sm font-medium text-gray-700">Technician</span>
    //           </label>
    //         </div>
    //       </div>

    //       <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
    //         {loading ? "Creating Account..." : "Create Account"}
    //       </button>
    //     </form>

    //     <p className="mt-6 text-center text-sm text-gray-600">
    //       Already have an account?{" "}
    //       <a href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700">Sign In</a>
    //     </p>
    //   </div>
    // </div>
    <div className="flex min-h-[100vh] items-center justify-center bg-[#10233F] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#345071] bg-[#1B3658] p-6 shadow-xl sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Join FixMate and get started today.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-2 text-xs text-gray-300">
              At least 6 characters, one uppercase and one lowercase letter.
            </p>
            {errors.map((error, index) => (
              <p key={index} className="mt-1 text-xs text-red-400">
                {error}
              </p>
            ))}
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-200">
              Select Your Role
            </p>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#45617F] bg-[#264669] p-3 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-600/20">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  defaultChecked
                  className="accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-200">
                  Customer
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#45617F] bg-[#264669] p-3 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-600/20">
                <input
                  type="radio"
                  name="role"
                  value="technician"
                  className="accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-200">
                  Technician
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
