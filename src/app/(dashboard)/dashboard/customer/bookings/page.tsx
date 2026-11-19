// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";
// import { Booking } from "@/lib/type";



// export default function MyBookingsPage() {
//   const { data: session, isPending } = authClient.useSession();

//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
//   const [cancelLoading, setCancelLoading] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

//   // Get customer bookings
//   useEffect(() => {
//     const getBookings = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${session.user.id}`,
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setBookings(data.result);
//         }
//       } catch (error) {
//         console.error("Get bookings error:", error);
//         toast.error("Failed to load bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!isPending) {
//       if (session?.user?.id) {
//         getBookings();
//       } else {
//         setLoading(false);
//       }
//     }
//   }, [session, isPending]);

//   // Cancel booking
//   const handleCancelBooking = async () => {
//     if (!selectedBooking || !session?.user?.id) return;

//     setCancelLoading(true);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: session.user.id,
//             status: "cancelled",
//           }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error(data.message || "Failed to cancel booking");
//         return;
//       }

//       setBookings((previousBookings) =>
//         previousBookings.map((booking) =>
//           booking._id === selectedBooking
//             ? { ...booking, status: "cancelled" }
//             : booking,
//         ),
//       );

//       toast.success("Booking cancelled successfully!");
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error("Cancel booking error:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setCancelLoading(false);
//     }
//   };

//   // Create Stripe Checkout Session
//   const handlePayment = async (bookingId: string) => {
//     if (!session?.user?.id) return;

//     setPaymentLoading(bookingId);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             bookingId,
//             customerEmail: session.user.email,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error(data.message || "Failed to start payment");
//         return;
//       }

//       if (!data.url) {
//         toast.error("Stripe Checkout URL not found");
//         return;
//       }

//       window.location.href = data.url;
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Unable to start payment. Please try again.");
//     } finally {
//       setPaymentLoading(null);
//     }
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "requested":
//         return "bg-yellow-100 text-yellow-700";
//       case "accepted":
//         return "bg-blue-100 text-blue-700";
//       case "in-progress":
//         return "bg-purple-100 text-purple-700";
//       case "completed":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "cancelled":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const formatStatus = (status: string) => {
//     return status
//       .split("-")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };

//   if (isPending || loading) {
//     return (
//       <div className="py-20 text-center text-gray-500">
//         Loading your bookings...
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <div className="py-20 text-center text-gray-600">
//         Please sign in to view your bookings.
//       </div>
//     );
//   }

//   if (session.user.role !== "customer") {
//     return (
//       <div className="py-20 text-center text-gray-600">
//         Only customers can view this page.
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-6">
//       {/* Back to Home */}
//       <Link
//         href="/"
//         className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
//       >
//         ← Back to Home
//       </Link>

//       {/* Page Heading */}
//       <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             My Bookings
//           </h1>
//           <p className="mt-2 text-sm text-gray-500">
//             Track your repair requests and payment status.
//           </p>
//         </div>
//         <p className="text-sm font-medium text-gray-500">
//           Total Bookings:{" "}
//           <span className="text-gray-900">{bookings.length}</span>
//         </p>
//       </div>

//       {/* Booking List */}
//       {bookings.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
//           <h2 className="text-lg font-semibold text-gray-800">
//             No Bookings Yet
//           </h2>
//           <p className="mt-2 text-sm text-gray-500">
//             You haven't requested any repair services yet.
//           </p>
//           <Link
//             href="/services"
//             className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//           >
//             Explore Services
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
//             >
//               {/* Main Booking Information */}
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                 <img
//                   src={booking.serviceImage || "/placeholder.png"}
//                   alt={booking.serviceTitle}
//                   className="h-20 w-full rounded-lg object-cover sm:h-20 sm:w-24"
//                 />

//                 <div className="min-w-0 flex-1">
//                   <h2 className="font-bold text-gray-900">
//                     {booking.serviceTitle}
//                   </h2>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Technician: {booking.technicianName}
//                   </p>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Preferred Date:{" "}
//                     {new Date(booking.preferredDate).toLocaleDateString()}
//                   </p>
//                 </div>

//                 {/* Status and Price */}
//                 <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}
//                   >
//                     {formatStatus(booking.status)}
//                   </span>

//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">
//                       {booking.status === "completed"
//                         ? "Final Amount"
//                         : "Base Price"}
//                     </p>
//                     <p className="font-bold text-gray-900">
//                       $
//                       {(booking.status === "completed"
//                         ? booking.finalAmount
//                         : booking.basePrice
//                       ).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment and Actions */}
//               <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-gray-500">Payment:</span>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
//                   >
//                     {formatStatus(booking.paymentStatus)}
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   {booking.status === "requested" && (
//                     <button
//                       type="button"
//                       onClick={() => setSelectedBooking(booking._id)}
//                       className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
//                     >
//                       Cancel Request
//                     </button>
//                   )}

//                   {booking.status === "completed" &&
//                     booking.paymentStatus === "unpaid" && (
//                       // <button type="button" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
//                       //   Pay Now
//                       // </button>
//                       <button
//                         type="button"
//                         onClick={() => handlePayment(booking._id)}
//                         disabled={paymentLoading === booking._id}
//                         className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         {paymentLoading === booking._id
//                           ? "Redirecting..."
//                           : "Pay Now"}
//                       </button>
//                     )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Cancel Confirmation Modal */}
//       {selectedBooking && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-xl font-bold text-gray-900">Cancel Booking?</h2>

//             <p className="mt-2 text-sm text-gray-600">
//               Are you sure you want to cancel this repair request? This action
//               cannot be undone.
//             </p>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 disabled={cancelLoading}
//                 onClick={() => setSelectedBooking(null)}
//                 className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Keep Booking
//               </button>

//               <button
//                 type="button"
//                 disabled={cancelLoading}
//                 onClick={handleCancelBooking}
//                 className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
//               >
//                 {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Booking } from "@/lib/type";

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  // Get customer bookings
  useEffect(() => {
    const getBookings = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${session.user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setBookings(data.result);
        } else {
          toast.error(data.message || "Failed to load bookings");
        }
      } catch (error) {
        console.error("Get bookings error:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      if (session?.user?.id) {
        getBookings();
      } else {
        setLoading(false);
      }
    }
  }, [session, isPending]);

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!selectedBooking || !session?.user?.id) return;

    setCancelLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            status: "cancelled",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to cancel booking");
        return;
      }

      // Update booking immediately without refreshing
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === selectedBooking
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      // Close modal and show success toast
      setSelectedBooking(null);
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Create Stripe Checkout Session
  const handlePayment = async (bookingId: string) => {
    if (!session?.user?.id) return;

    setPaymentLoading(bookingId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            customerEmail: session.user.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to start payment");
        return;
      }

      if (!data.url) {
        toast.error("Stripe Checkout URL not found");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Unable to start payment. Please try again.");
    } finally {
      setPaymentLoading(null);
    }
  };

  // Booking status colors
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#10233F] py-20 text-center text-gray-300">
        Loading your bookings...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#10233F] py-20 text-center text-gray-300">
        Please sign in to view your bookings.
      </div>
    );
  }

  if (session.user.role !== "customer") {
    return (
      <div className="min-h-screen bg-[#10233F] py-20 text-center text-gray-300">
        Only customers can view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-blue-400"
        >
          ← Back to Home
        </Link>

        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              My Bookings
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Track your repair requests and payment status.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-300">
            Total Bookings:{" "}
            <span className="font-bold text-white">{bookings.length}</span>
          </p>
        </div>

        {/* Booking List */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#345071] bg-[#1B3658] px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-white">
              No Bookings Yet
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              You haven't requested any repair services yet.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-[#29415F] bg-[#1B3658] p-4 shadow-sm transition hover:border-blue-500/50 hover:shadow-lg sm:p-5"
              >
                {/* Main Booking Information */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img
                    src={booking.serviceImage || "/placeholder.png"}
                    alt={booking.serviceTitle}
                    className="h-20 w-full rounded-lg object-cover sm:h-20 sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-white">
                      {booking.serviceTitle}
                    </h2>
                    <p className="mt-1 text-sm text-gray-300">
                      Technician: {booking.technicianName}
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      Preferred Date:{" "}
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status and Price */}
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}
                    >
                      {formatStatus(booking.status)}
                    </span>

                    <div className="text-right">
                      <p className="text-xs text-gray-300">
                        {booking.status === "completed"
                          ? "Final Amount"
                          : "Base Price"}
                      </p>
                      <p className="font-bold text-white">
                        $
                        {(booking.status === "completed"
                          ? booking.finalAmount
                          : booking.basePrice
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment and Actions */}
                <div className="mt-4 flex flex-col gap-3 border-t border-[#345071] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300">Payment:</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {formatStatus(booking.paymentStatus)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {booking.status === "requested" && (
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(booking._id)}
                        className="rounded-lg border border-red-400/50 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                      >
                        Cancel Request
                      </button>
                    )}

                    {booking.status === "completed" &&
                      booking.paymentStatus === "unpaid" && (
                        <button
                          type="button"
                          onClick={() => handlePayment(booking._id)}
                          disabled={paymentLoading === booking._id}
                          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {paymentLoading === booking._id
                            ? "Redirecting..."
                            : "Pay Now"}
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl border border-[#345071] bg-[#1B3658] p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white">
                Cancel Booking?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-300">
                Are you sure you want to cancel this repair request? This
                action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={() => setSelectedBooking(null)}
                  className="rounded-lg border border-[#45617F] px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-[#264669] disabled:opacity-50"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={handleCancelBooking}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

