
"use client";

import Link from "next/link";
import { ArrowLeft, Wrench, House, Store } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddServicePage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();
 const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (!user) {
    toast.error("Please sign in first.");
    return;
  }

  const formData = new FormData(e.currentTarget);
  const serviceData = Object.fromEntries(formData.entries());

  const newService = {
    ...serviceData,
    basePrice: Number(serviceData.basePrice),
    technicianId: user.id,
    technicianName: user.name,
    technicianEmail: user.email,
    approvalStatus: "pending",
    isAvailable: true,
  };

  try {
    // const { data: tokenData, error: tokenError } = await authClient.token();

    // if (tokenError || !tokenData?.token) {
    //   toast.error("Authentication failed. Please sign in again.");
    //   return;
    // }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${tokenData.token}`,
      },
      body: JSON.stringify(newService),
    });

    const result = await response.json();
    

    if (!response.ok) {
      throw new Error(result.message || "Failed to add service");
    }

    toast.success("Service submitted for approval!");

    form.reset();
    router.push("/dashboard/technician/services");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Something went wrong!");
  }
};
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Add New Service</h1>
          <p className="mt-2 text-sm text-gray-500">Provide details about your repair service.</p>
        </div>

        <form onSubmit={handleAddService} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          {/* Service Information */}
          <div>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Wrench size={20} className="text-blue-600" />
              Service Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Service Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. iPhone Screen Replacement"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Category *</label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop & PC">Laptop & PC</option>
                  <option value="AC">AC</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="TV">TV</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe what your repair service includes..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Service Image URL *</label>
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="Paste your service image URL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-xs text-gray-400">You can use an image URL for now. We'll add ImgBB later.</p>
              </div>
            </div>
          </div>

          {/* Pricing and Duration */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">Pricing & Duration</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Base Price (USD) *</label>
                <input
                  type="number"
                  name="basePrice"
                  required
                  min="1"
                  step="0.01"
                  placeholder="e.g. 50"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Estimated Duration *</label>
                <input
                  type="text"
                  name="estimatedDuration"
                  required
                  placeholder="e.g. 2-3 hours"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">Service Availability</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">Service Mode *</label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                    <input type="radio" name="serviceMode" value="Home Visit" required className="accent-blue-600" />
                    <House size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Home Visit</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                    <input type="radio" name="serviceMode" value="Shop Drop-off" required className="accent-blue-600" />
                    <Store size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Shop Drop-off</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Service Area *</label>
                <input
                  type="text"
                  name="serviceArea"
                  required
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Approval Notice */}
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-800">Admin Approval Required</p>
            <p className="mt-1 text-sm text-blue-700">
              Your service will be submitted for admin approval. Customers can see it after approval.
            </p>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Wrench size={18} />
            Submit Service for Approval
          </button>
        </form>
      </div>
    </div>
  );
}
