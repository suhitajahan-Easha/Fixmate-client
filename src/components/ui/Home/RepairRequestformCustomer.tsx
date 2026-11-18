
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  customerId: string;
  customerName: string;
  customerEmail: string;
  serviceId: string;
  basePrice: number;
  onClose: () => void;
};

export default function RepairRequestForm({
  customerId,
  customerName,
  customerEmail,
  serviceId,
  basePrice,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      customerId,
      serviceId,
      customerPhone: formData.get("customerPhone"),
      address: formData.get("address"),
      preferredDate: formData.get("preferredDate"),
      problemDescription: formData.get("problemDescription"),
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to submit repair request");
        return;
      }

      toast.success("Repair request submitted successfully!");
      onClose();
      router.push("/dashboard/customer/bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
      {/* Modal Heading */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Request a Repair</h2>
          <p className="mt-1 text-sm text-gray-500">
            Provide your details so the technician can review your request.
          </p>
        </div>

        <button type="button" onClick={onClose} className="rounded-lg px-3 py-1 text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Customer Information</h3>

          <div>
            <label htmlFor="customerName" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
            <input id="customerName" value={customerName} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
          </div>

          <div>
            <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
            <input id="customerEmail" value={customerEmail} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
          </div>
        </div>

        {/* Repair Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Repair Information</h3>

          <div>
            <label htmlFor="customerPhone" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
            <input id="customerPhone" name="customerPhone" type="tel" required placeholder="Enter your phone number" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Service Address / Pickup Address</label>
            <textarea id="address" name="address" required rows={3} placeholder="Enter your full address" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label htmlFor="preferredDate" className="mb-2 block text-sm font-medium text-gray-700">Preferred Date</label>
            <input id="preferredDate" name="preferredDate" type="date" min={getToday()} required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            <p className="mt-1 text-xs text-gray-500">Choose today or a future date.</p>
          </div>

          <div>
            <label htmlFor="problemDescription" className="mb-2 block text-sm font-medium text-gray-700">Problem Description</label>
            <textarea id="problemDescription" name="problemDescription" required minLength={20} rows={4} placeholder="Describe what's wrong with your device (minimum 20 characters)." className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-sm text-gray-500">Starting Price</p>
            <p className="text-xl font-bold text-blue-600">${basePrice.toFixed(2)}</p>
          </div>
          <span className="text-xs text-gray-500">No payment required now</span>
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Submitting..." : "Submit Repair Request"}
        </button>
      </form>
    </div>
  );
}
