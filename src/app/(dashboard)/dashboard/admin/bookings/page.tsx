"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


type Booking = {
  _id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
  basePrice: number;
  finalAmount: number;
};

type FilterStatus =
  | "all"
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed"
  | "rejected"
  | "cancelled";

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

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
const getStatusStyle = (status: string) => {
  switch (status) {
    case "requested":
      return "bg-blue-500/15 text-blue-400";
    case "accepted":
      return "bg-indigo-500/15 text-indigo-400";
    case "in-progress":
      return "bg-amber-500/15 text-amber-400";
    case "completed":
      return "bg-green-500/15 text-green-400";
    case "rejected":
      return "bg-red-500/15 text-red-400";
    case "cancelled":
      return "bg-gray-500/15 text-gray-400";
    default:
      return "bg-gray-500/15 text-gray-400";
  }
};
const formatStatus = (status: string) => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function AllBookingsPage() {
  const { data: session, isPending } = authClient.useSession();
  
    

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Fetch all platform bookings for admin
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
      });

        const bdata = await response.json();

        if (!response.ok || !bdata.success) {
          toast.error(bdata.message || "Failed to load bookings");
          return;
        }

        setBookings(bdata.result);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        toast.error("Something went wrong while loading bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.id, isPending]);

  // Filter bookings by status
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });

  // Summary counts
  const totalBookings = bookings.length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;

  const inProgressBookings = bookings.filter(
    (booking) => booking.status === "in-progress",
  ).length;

  const unpaidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "unpaid",
  ).length;

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          Please sign in to continue
        </h2>
        <Link
          href="/sign-in"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-sm text-gray-500">
          Only administrators can view all bookings.
        </p>
        <Link href="/" className="text-sm font-semibold text-blue-600">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#10233F] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-blue-400"
        >
          ← Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            All Bookings
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Monitor all repair bookings across the FixMate platform.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-gray-300">Total Bookings</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {totalBookings}
            </h2>
            <p className="mt-1 text-xs text-gray-400">All platform bookings</p>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-gray-300">Completed</p>
            <h2 className="mt-2 text-2xl font-bold text-green-400">
              {completedBookings}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Successfully completed</p>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-gray-300">In Progress</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-400">
              {inProgressBookings}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Active repair jobs</p>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium text-gray-300">Unpaid Bookings</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-400">
              {unpaidBookings}
            </h2>
            <p className="mt-1 text-xs text-gray-400">Payment not received</p>
          </div>
        </div>

        {/* Booking Records */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">Booking Records</h2>
          <p className="mt-1 text-sm text-gray-300">
            View and monitor every customer booking.
          </p>
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
                  : "border border-[#45617F] bg-[#1B3658] text-gray-300 hover:border-blue-400 hover:text-blue-400"
              }`}
            >
              {filter.label}
              {filter.value === "all" && ` (${bookings.length})`}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="overflow-hidden rounded-xl border border-[#345071] bg-[#1B3658] shadow-sm">
          {filteredBookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mb-3 text-4xl">📋</div>
              <h3 className="text-lg font-semibold text-white">
                No bookings found
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                There are no bookings under this status.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-287.5 border-collapse text-left">
                <thead className="bg-[#142D4C]">
                  <tr className="border-b border-[#345071]">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Service
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Customer
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Technician
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Preferred Date
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Payment
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#345071]">
                  {filteredBookings.map((booking) => {
                    const amount =
                      booking.status === "completed"
                        ? booking.finalAmount
                        : booking.basePrice;

                    return (
                      <tr
                        key={booking._id}
                        className="transition hover:bg-[#264669]/50"
                      >
                        {/* Service */}
                        <td className="px-5 py-5">
                          <p className="max-w-45 font-semibold text-white">
                            {booking.serviceTitle}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-5">
                          <p className="font-medium text-gray-200">
                            {booking.customerName}
                          </p>
                          <p className="mt-1 break-all text-xs text-gray-400">
                            {booking.customerEmail}
                          </p>
                        </td>

                        {/* Technician */}
                        <td className="px-5 py-5">
                          <p className="font-medium text-gray-200">
                            {booking.technicianName}
                          </p>
                          <p className="mt-1 break-all text-xs text-gray-400">
                            {booking.technicianEmail}
                          </p>
                        </td>

                        {/* Preferred Date */}
                        <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-300">
                          {new Date(booking.preferredDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>

                        {/* Booking Status */}
                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}
                          >
                            {formatStatus(booking.status)}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                              booking.paymentStatus === "paid"
                                ? "bg-green-500/15 text-green-400"
                                : "bg-amber-500/15 text-amber-400"
                            }`}
                          >
                            {formatStatus(booking.paymentStatus)}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-white">
                          ${Number(amount ?? 0).toFixed(2)}
                          <p className="mt-1 text-xs font-normal text-gray-400">
                            {booking.status === "completed"
                              ? "Final amount"
                              : "Base price"}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-gray-400">
          Showing {filteredBookings.length} of {totalBookings} bookings.
        </p>
      </div>
    </div>
  );
}
