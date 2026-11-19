
// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// type Props = {
//   customerId: string;
//   customerName: string;
//   customerEmail: string;
//   serviceId: string;
//   basePrice: number;
//   onClose: () => void;
// };

// export default function RepairRequestForm({
//   customerId,
//   customerName,
//   customerEmail,
//   serviceId,
//   basePrice,
//   onClose,
// }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const getToday = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const day = String(today.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const bookingData = {
//       customerId,
//       serviceId,
//       customerPhone: formData.get("customerPhone"),
//       address: formData.get("address"),
//       preferredDate: formData.get("preferredDate"),
//       problemDescription: formData.get("problemDescription"),
//     };

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error(data.message || "Failed to submit repair request");
//         return;
//       }

//       toast.success("Repair request submitted successfully!");
//       onClose();
//       router.push("/dashboard/customer/bookings");
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
//       {/* Modal Heading */}
//       <div className="mb-6 flex items-start justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900">Request a Repair</h2>
//           <p className="mt-1 text-sm text-gray-500">
//             Provide your details so the technician can review your request.
//           </p>
//         </div>

//         <button type="button" onClick={onClose} className="rounded-lg px-3 py-1 text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
//           ✕
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Customer Information */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-gray-800">Customer Information</h3>

//           <div>
//             <label htmlFor="customerName" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
//             <input id="customerName" value={customerName} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
//           </div>

//           <div>
//             <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
//             <input id="customerEmail" value={customerEmail} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
//           </div>
//         </div>

//         {/* Repair Information */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-gray-800">Repair Information</h3>

//           <div>
//             <label htmlFor="customerPhone" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
//             <input id="customerPhone" name="customerPhone" type="tel" required placeholder="Enter your phone number" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
//           </div>

//           <div>
//             <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Service Address / Pickup Address</label>
//             <textarea id="address" name="address" required rows={3} placeholder="Enter your full address" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
//           </div>

//           <div>
//             <label htmlFor="preferredDate" className="mb-2 block text-sm font-medium text-gray-700">Preferred Date</label>
//             <input id="preferredDate" name="preferredDate" type="date" min={getToday()} required className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
//             <p className="mt-1 text-xs text-gray-500">Choose today or a future date.</p>
//           </div>

//           <div>
//             <label htmlFor="problemDescription" className="mb-2 block text-sm font-medium text-gray-700">Problem Description</label>
//             <textarea id="problemDescription" name="problemDescription" required minLength={20} rows={4} placeholder="Describe what's wrong with your device (minimum 20 characters)." className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
//           </div>
//         </div>

//         {/* Price */}
//         <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//           <div>
//             <p className="text-sm text-gray-500">Starting Price</p>
//             <p className="text-xl font-bold text-blue-600">${basePrice.toFixed(2)}</p>
//           </div>
//           <span className="text-xs text-gray-500">No payment required now</span>
//         </div>

//         <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
//           {loading ? "Submitting..." : "Submit Repair Request"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { X, UserRound, Wrench, CalendarDays, Wallet } from "lucide-react";

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

  const inputStyle = "w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";

  const labelStyle = "mb-2 block text-sm font-medium text-gray-200";

  return (
    <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-[#345071] bg-[#1B3658] p-5 text-white shadow-2xl sm:p-7">

      {/* Modal Heading */}
      <div className="mb-7 flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            <Wrench size={23} />
          </div>
          <h2 className="text-xl font-bold sm:text-2xl">Request a Repair</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Provide your details so the technician can review your request.
          </p>
        </div>

        <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-300 transition hover:bg-[#264669] hover:text-white">
          <X size={21} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">

        {/* Customer Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#345071] pb-3">
            <UserRound size={19} className="text-blue-400" />
            <h3 className="font-semibold text-white">Customer Information</h3>
          </div>

          <div>
            <label htmlFor="customerName" className={labelStyle}>Full Name</label>
            <input id="customerName" value={customerName} readOnly className="w-full rounded-lg border border-[#345071] bg-[#142D4C] px-4 py-3 text-sm text-gray-300 outline-none" />
          </div>

          <div>
            <label htmlFor="customerEmail" className={labelStyle}>Email Address</label>
            <input id="customerEmail" value={customerEmail} readOnly className="w-full rounded-lg border border-[#345071] bg-[#142D4C] px-4 py-3 text-sm text-gray-300 outline-none" />
          </div>
        </div>

        {/* Repair Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#345071] pb-3">
            <Wrench size={19} className="text-blue-400" />
            <h3 className="font-semibold text-white">Repair Information</h3>
          </div>

          <div>
            <label htmlFor="customerPhone" className={labelStyle}>Phone Number</label>
            <input id="customerPhone" name="customerPhone" type="tel" required placeholder="Enter your phone number" className={inputStyle} />
          </div>

          <div>
            <label htmlFor="address" className={labelStyle}>Service Address / Pickup Address</label>
            <textarea id="address" name="address" required rows={3} placeholder="Enter your full address" className={`${inputStyle} resize-none`} />
          </div>

          <div>
            <label htmlFor="preferredDate" className={labelStyle}>Preferred Date</label>
            <input id="preferredDate" name="preferredDate" type="date" min={getToday()} required className={inputStyle} />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays size={14} /> Choose today or a future date.
            </p>
          </div>

          <div>
            <label htmlFor="problemDescription" className={labelStyle}>Problem Description</label>
            <textarea id="problemDescription" name="problemDescription" required minLength={20} rows={4} placeholder="Describe what's wrong with your device (minimum 20 characters)." className={`${inputStyle} resize-none`} />
            <p className="mt-2 text-xs text-gray-400">Minimum 20 characters required.</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#345071] pt-5">
          <div>
            <p className="flex items-center gap-2 text-sm text-gray-300">
              <Wallet size={16} className="text-blue-400" /> Starting Price
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-400">
              ${basePrice.toFixed(2)}
            </p>
          </div>
          <span className="rounded-full bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400">
            No payment required now
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Submitting..." : "Submit Repair Request"}
        </button>

      </form>
    </div>
  );
}

