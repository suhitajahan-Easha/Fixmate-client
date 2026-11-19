
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";

// type Booking = {
//   _id: string;
//   customerName: string;
//   customerPhone: string;
//   address: string;
//   preferredDate: string;
//   problemDescription: string;
//   serviceTitle: string;
//   basePrice: number;
//   finalAmount: number;
//   status: string;
//   paymentStatus: string;
// };

// type FilterStatus =
//   | "all"
//   | "requested"
//   | "accepted"
//   | "in-progress"
//   | "completed";

// const filters: { label: string; value: FilterStatus }[] = [
//   { label: "All", value: "all" },
//   { label: "Requested", value: "requested" },
//   { label: "Accepted", value: "accepted" },
//   { label: "In Progress", value: "in-progress" },
//   { label: "Completed", value: "completed" },
// ];

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "requested":
//       return "bg-amber-100 text-amber-700";
//     case "accepted":
//       return "bg-blue-100 text-blue-700";
//     case "in-progress":
//       return "bg-purple-100 text-purple-700";
//     case "completed":
//       return "bg-green-100 text-green-700";
//     case "rejected":
//       return "bg-red-100 text-red-700";
//     case "cancelled":
//       return "bg-gray-100 text-gray-700";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// const formatStatus = (status: string) => {
//   return status
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export default function ManageRequestsPage() {
//   const { data: session, isPending } = authClient.useSession();

//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

//   const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(
//     null
//   );

//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [finalAmount, setFinalAmount] = useState("");

//   // Fetch technician bookings
//   useEffect(() => {
//     if (isPending) return;

//     if (!session?.user?.id) {
//       setLoading(false);
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${session.user.id}`
//         );

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           toast.error(data.message || "Failed to load bookings");
//           return;
//         }

//         setBookings(data.result);
//       } catch (error) {
//         console.error("Fetch bookings error:", error);
//         toast.error("Something went wrong while loading bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [session?.user?.id, isPending]);

//   // Filter bookings
//   const filteredBookings = bookings.filter((booking) => {
//     if (filterStatus === "all") return true;
//     return booking.status === filterStatus;
//   });

//   // Update booking status
//   const handleUpdateStatus = async (
//     bookingId: string,
//     status: string,
//     amount?: number
//   ) => {
//     if (!session?.user?.id) {
//       toast.error("Please sign in first");
//       return false;
//     }

//     setUpdatingBookingId(bookingId);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: session.user.id,
//             status,
//             ...(amount !== undefined && { finalAmount: amount }),
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         toast.error(data.message || "Failed to update booking");
//         return false;
//       }

//       setBookings((prev) =>
//         prev.map((booking) =>
//           booking._id === bookingId
//             ? {
//                 ...booking,
//                 status,
//                 ...(status === "completed" && amount !== undefined
//                   ? { finalAmount: amount }
//                   : {}),
//               }
//             : booking
//         )
//       );

//       toast.success(data.message || "Booking updated successfully");
//       return true;
//     } catch (error) {
//       console.error("Update booking error:", error);
//       toast.error("Something went wrong. Please try again.");
//       return false;
//     } finally {
//       setUpdatingBookingId(null);
//     }
//   };

//   // Open completion modal
//   const openCompleteModal = (booking: Booking) => {
//     setSelectedBooking(booking);
//     setFinalAmount(String(booking.basePrice));
//   };

//   // Complete booking with final amount
//   const handleCompleteBooking = async () => {
//     if (!selectedBooking) return;

//     const amount = Number(finalAmount);

//     if (
//       finalAmount.trim() === "" ||
//       !Number.isFinite(amount) ||
//       amount <= 0
//     ) {
//       toast.error("Please enter a valid final amount greater than zero");
//       return;
//     }

//     const updated = await handleUpdateStatus(
//       selectedBooking._id,
//       "completed",
//       amount
//     );

//     if (updated) {
//       setSelectedBooking(null);
//       setFinalAmount("");
//     }
//   };

//   if (isPending || loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-gray-500">Loading repair requests...</p>
//       </div>
//     );
//   }

//   if (!session?.user?.id) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
//         <h2 className="text-xl font-bold text-gray-800">
//           Please sign in to continue
//         </h2>
//         <Link
//           href="/sign-in"
//           className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//         >
//           Sign In
//         </Link>
//       </div>
//     );
//   }

//   if (session.user.role !== "technician") {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
//         <h2 className="text-xl font-bold text-gray-800">
//           Access Denied
//         </h2>
//         <p className="text-sm text-gray-500">
//           Only technicians can manage repair requests.
//         </p>
//         <Link href="/" className="text-sm font-semibold text-blue-600">
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Back to Home */}
//         <Link
//           href="/"
//           className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
//         >
//           ← Back to Home
//         </Link>

//         {/* Page Heading */}
//         <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               Manage Requests
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Review and manage your customer repair requests.
//             </p>
//           </div>

//           <div className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm">
//             Total Requests:{" "}
//             <span className="font-bold text-gray-900">
//               {bookings.length}
//             </span>
//           </div>
//         </div>

//         {/* Status Filters */}
//         <div className="mb-5 flex flex-wrap gap-2">
//           {filters.map((filter) => (
//             <button
//               key={filter.value}
//               onClick={() => setFilterStatus(filter.value)}
//               className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
//                 filterStatus === filter.value
//                   ? "bg-blue-600 text-white shadow-sm"
//                   : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
//               }`}
//             >
//               {filter.label}
//               {filter.value === "all" && ` (${bookings.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Requests Table */}
//         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//           {filteredBookings.length === 0 ? (
//             <div className="px-6 py-16 text-center">
//               <div className="mb-3 text-4xl">📋</div>
//               <h3 className="text-lg font-semibold text-gray-800">
//                 No requests found
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 There are no bookings under this status.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-300 border-collapse text-left">
//                 <thead className="bg-gray-50">
//                   <tr className="border-b border-gray-200">
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Customer
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Service
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Address
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Preferred Date
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Problem Description
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Status
//                     </th>
//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-100">
//                   {filteredBookings.map((booking) => (
//                     <tr key={booking._id} className="transition hover:bg-gray-50">
//                       {/* Customer */}
//                       <td className="px-5 py-5">
//                         <p className="font-semibold text-gray-800">
//                           {booking.customerName}
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {booking.customerPhone}
//                         </p>
//                       </td>

//                       {/* Service */}
//                       <td className="px-5 py-5">
//                         <p className="max-w-45 font-medium text-gray-700">
//                           {booking.serviceTitle}
//                         </p>
//                       </td>

//                       {/* Address */}
//                       <td className="px-5 py-5">
//                         <p className="max-w-40 text-sm text-gray-600">
//                           {booking.address}
//                         </p>
//                       </td>

//                       {/* Preferred Date */}
//                       <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-600">
//                         {new Date(booking.preferredDate).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           }
//                         )}
//                       </td>

//                       {/* Problem Description */}
//                       <td className="px-5 py-5">
//                         <p className="max-w-55 text-sm leading-6 text-gray-600">
//                           {booking.problemDescription}
//                         </p>
//                       </td>

//                       {/* Status and Payment */}
//                       <td className="px-5 py-5">
//                         <div className="flex flex-col items-start gap-2">
//                           <span
//                             className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
//                               booking.status
//                             )}`}
//                           >
//                             {formatStatus(booking.status)}
//                           </span>

//                           {booking.status === "completed" && (
//                             <span
//                               className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
//                                 booking.paymentStatus === "paid"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-amber-100 text-amber-700"
//                               }`}
//                             >
//                               {booking.paymentStatus === "paid"
//                                 ? "Paid"
//                                 : "Unpaid"}
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-5 py-5">
//                         <div className="flex min-w-32.5 flex-col items-start gap-2">
//                           {booking.status === "requested" && (
//                             <>
//                               <button
//                                 disabled={updatingBookingId === booking._id}
//                                 onClick={() =>
//                                   handleUpdateStatus(booking._id, "accepted")
//                                 }
//                                 className="w-full rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               >
//                                 {updatingBookingId === booking._id
//                                   ? "Updating..."
//                                   : "Accept"}
//                               </button>

//                               <button
//                                 disabled={updatingBookingId === booking._id}
//                                 onClick={() =>
//                                   handleUpdateStatus(booking._id, "rejected")
//                                 }
//                                 className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                               >
//                                 Reject
//                               </button>
//                             </>
//                           )}

//                           {booking.status === "accepted" && (
//                             <button
//                               disabled={updatingBookingId === booking._id}
//                               onClick={() =>
//                                 handleUpdateStatus(
//                                   booking._id,
//                                   "in-progress"
//                                 )
//                               }
//                               className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               {updatingBookingId === booking._id
//                                 ? "Updating..."
//                                 : "Start Work"}
//                             </button>
//                           )}

//                           {booking.status === "in-progress" && (
//                             <button
//                               disabled={updatingBookingId === booking._id}
//                               onClick={() => openCompleteModal(booking)}
//                               className="w-full rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               Mark Completed
//                             </button>
//                           )}

//                           {["completed", "rejected", "cancelled"].includes(
//                             booking.status
//                           ) && (
//                             <span className="text-xs text-gray-400">
//                               No further action
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Completion Modal */}
//         {selectedBooking && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//               <div className="mb-5">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Complete Repair
//                 </h2>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Enter the final amount charged to the customer.
//                 </p>
//               </div>

//               <div className="mb-5 rounded-lg bg-gray-50 p-3">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {selectedBooking.serviceTitle}
//                 </p>
//                 <p className="mt-1 text-xs text-gray-500">
//                   Customer: {selectedBooking.customerName}
//                 </p>
//                 <p className="mt-1 text-xs text-gray-500">
//                   Base Price: ${selectedBooking.basePrice.toFixed(2)}
//                 </p>
//               </div>

//               <div className="mb-6">
//                 <label
//                   htmlFor="finalAmount"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Final Amount ($)
//                 </label>

//                 <input
//                   id="finalAmount"
//                   type="number"
//                   min="0.01"
//                   step="0.01"
//                   value={finalAmount}
//                   onChange={(e) => setFinalAmount(e.target.value)}
//                   placeholder="Enter final amount"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//                 <p className="mt-2 text-xs text-gray-400">
//                   The base price is pre-filled. You can change the amount.
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   disabled={updatingBookingId === selectedBooking._id}
//                   onClick={() => {
//                     setSelectedBooking(null);
//                     setFinalAmount("");
//                   }}
//                   className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   disabled={updatingBookingId === selectedBooking._id}
//                   onClick={handleCompleteBooking}
//                   className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {updatingBookingId === selectedBooking._id
//                     ? "Updating..."
//                     : "Mark Completed"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type Booking = {
  _id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  serviceTitle: string;
  basePrice: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;
};

type FilterStatus =
  | "all"
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed";

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "requested":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    case "accepted":
      return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
    case "in-progress":
      return "bg-purple-500/15 text-purple-400 border border-purple-500/30";
    case "completed":
      return "bg-green-500/15 text-green-400 border border-green-500/30";
    case "rejected":
      return "bg-red-500/15 text-red-400 border border-red-500/30";
    case "cancelled":
      return "bg-gray-500/15 text-gray-400 border border-gray-500/30";
    default:
      return "bg-gray-500/15 text-gray-400 border border-gray-500/30";
  }
};

const formatStatus = (status: string) => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ManageRequestsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [finalAmount, setFinalAmount] = useState("");

  // Fetch technician bookings
  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      const { data, error } = await authClient.token();
              const token = data?.token;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${session.user.id}`,{
            headers:{
               authorization:`Bearer ${token}`,
              }

          }
        );

        const ddata = await response.json();

        if (!response.ok || !ddata.success) {
          toast.error(ddata.message || "Failed to load bookings");
          return;
        }

        setBookings(ddata.result);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        toast.error("Something went wrong while loading bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.id, isPending]);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });

  // Update booking status
  const handleUpdateStatus = async (
    bookingId: string,
    status: string,
    amount?: number
  ) => {
    const { data, error } = await authClient.token();
    const token = data?.token;
    if (!session?.user?.id) {
      toast.error("Please sign in first");
      return false;
    }

    setUpdatingBookingId(bookingId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: session.user.id,
            status,
            ...(amount !== undefined && { finalAmount: amount }),
          }),
        }
      );

      const ddata = await response.json();

      if (!response.ok || !ddata.success) {
        toast.error(ddata.message || "Failed to update booking");
        return false;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status,
                ...(status === "completed" && amount !== undefined
                  ? { finalAmount: amount }
                  : {}),
              }
            : booking
        )
      );

      toast.success(ddata.message || "Booking updated successfully");
      return true;
    } catch (error) {
      console.error("Update booking error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    } finally {
      setUpdatingBookingId(null);
    }
  };

  // Open completion modal
  const openCompleteModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setFinalAmount(String(booking.basePrice));
  };

  // Complete booking with final amount
  const handleCompleteBooking = async () => {
    if (!selectedBooking) return;

    const amount = Number(finalAmount);

    if (
      finalAmount.trim() === "" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      toast.error("Please enter a valid final amount greater than zero");
      return;
    }

    const updated = await handleUpdateStatus(
      selectedBooking._id,
      "completed",
      amount
    );

    if (updated) {
      setSelectedBooking(null);
      setFinalAmount("");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#10233F]">
        <p className="text-gray-300">Loading repair requests...</p>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#10233F] px-4">
        <h2 className="text-xl font-bold text-white">Please sign in to continue</h2>
        <Link href="/sign-in" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
          Sign In
        </Link>
      </div>
    );
  }

  if (session.user.role !== "technician") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#10233F] px-4">
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-center text-sm text-gray-400">Only technicians can manage repair requests.</p>
        <Link href="/" className="text-sm font-semibold text-blue-400 hover:text-blue-300">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Home */}
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-blue-400">
          ← Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Manage Requests
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Review and manage your customer repair requests.
            </p>
          </div>

          <div className="rounded-lg border border-[#345071] bg-[#1B3658] px-4 py-2.5 text-sm font-medium text-gray-300 shadow-sm">
            Total Requests:{" "}
            <span className="font-bold text-white">{bookings.length}</span>
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filterStatus === filter.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-[#345071] bg-[#1B3658] text-gray-300 hover:border-blue-500 hover:text-blue-400"
              }`}
            >
              {filter.label}
              {filter.value === "all" && ` (${bookings.length})`}
            </button>
          ))}
        </div>

        {/* Requests Table */}
        <div className="overflow-hidden rounded-xl border border-[#345071] bg-[#1B3658] shadow-sm">
          {filteredBookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mb-3 text-4xl">📋</div>
              <h3 className="text-lg font-semibold text-white">No requests found</h3>
              <p className="mt-1 text-sm text-gray-400">
                There are no bookings under this status.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse text-left">
                <thead className="bg-[#142D4C]">
                  <tr className="border-b border-[#345071]">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Customer</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Service</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Address</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Preferred Date</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Problem Description</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Status</th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#345071]">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="transition hover:bg-[#264669]/50">
                      {/* Customer */}
                      <td className="px-5 py-5">
                        <p className="font-semibold text-white">{booking.customerName}</p>
                        <p className="mt-1 text-sm text-gray-400">{booking.customerPhone}</p>
                      </td>

                      {/* Service */}
                      <td className="px-5 py-5">
                        <p className="max-w-45 font-medium text-gray-200">{booking.serviceTitle}</p>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-5">
                        <p className="max-w-40 text-sm text-gray-300">{booking.address}</p>
                      </td>

                      {/* Preferred Date */}
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-300">
                        {new Date(booking.preferredDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Problem Description */}
                      <td className="px-5 py-5">
                        <p className="max-w-55 text-sm leading-6 text-gray-300">
                          {booking.problemDescription}
                        </p>
                      </td>

                      {/* Status and Payment */}
                      <td className="px-5 py-5">
                        <div className="flex flex-col items-start gap-2">
                          <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}>
                            {formatStatus(booking.status)}
                          </span>

                          {booking.status === "completed" && (
                            <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${
                              booking.paymentStatus === "paid"
                                ? "border-green-500/30 bg-green-500/15 text-green-400"
                                : "border-amber-500/30 bg-amber-500/15 text-amber-400"
                            }`}>
                              {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-5">
                        <div className="flex min-w-32.5 flex-col items-start gap-2">
                          {booking.status === "requested" && (
                            <>
                              <button
                                disabled={updatingBookingId === booking._id}
                                onClick={() => handleUpdateStatus(booking._id, "accepted")}
                                className="w-full rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {updatingBookingId === booking._id ? "Updating..." : "Accept"}
                              </button>

                              <button
                                disabled={updatingBookingId === booking._id}
                                onClick={() => handleUpdateStatus(booking._id, "rejected")}
                                className="w-full rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {booking.status === "accepted" && (
                            <button
                              disabled={updatingBookingId === booking._id}
                              onClick={() => handleUpdateStatus(booking._id, "in-progress")}
                              className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {updatingBookingId === booking._id ? "Updating..." : "Start Work"}
                            </button>
                          )}

                          {booking.status === "in-progress" && (
                            <button
                              disabled={updatingBookingId === booking._id}
                              onClick={() => openCompleteModal(booking)}
                              className="w-full rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Mark Completed
                            </button>
                          )}

                          {["completed", "rejected", "cancelled"].includes(booking.status) && (
                            <span className="text-xs text-gray-400">No further action</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Completion Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-6 sm:px-4">
            <div className="my-auto w-full max-w-md rounded-2xl border border-[#345071] bg-[#1B3658] p-5 shadow-xl sm:p-6">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">Complete Repair</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Enter the final amount charged to the customer.
                </p>
              </div>

              <div className="mb-5 rounded-lg border border-[#345071] bg-[#142D4C] p-3">
                <p className="text-sm font-semibold text-white">{selectedBooking.serviceTitle}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Customer: {selectedBooking.customerName}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Base Price: ${selectedBooking.basePrice.toFixed(2)}
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="finalAmount" className="mb-2 block text-sm font-semibold text-gray-200">
                  Final Amount ($)
                </label>

                <input
                  id="finalAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={finalAmount}
                  onChange={(e) => setFinalAmount(e.target.value)}
                  placeholder="Enter final amount"
                  className="w-full rounded-lg border border-[#45617F] bg-[#264669] px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                <p className="mt-2 text-xs text-gray-400">
                  The base price is pre-filled. You can change the amount.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  disabled={updatingBookingId === selectedBooking._id}
                  onClick={() => {
                    setSelectedBooking(null);
                    setFinalAmount("");
                  }}
                  className="flex-1 rounded-lg border border-[#45617F] px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-[#264669] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  disabled={updatingBookingId === selectedBooking._id}
                  onClick={handleCompleteBooking}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updatingBookingId === selectedBooking._id ? "Updating..." : "Mark Completed"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

