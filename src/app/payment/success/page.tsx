// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// interface Payment {
//   amount: number;
//   transactionId: string;
//   serviceTitle: string;
// }
// function PaymentSuccessContent() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   const [payment, setPayment] = useState<Payment | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!sessionId) {
//         setError("Payment session ID not found.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("/api/payments/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ sessionId }),
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           setError(data.message || "Payment verification failed.");
//           return;
//         }

//         setPayment(data.payment);
//       } catch (error) {
//         console.error("Payment verification error:", error);
//         setError("Something went wrong while verifying your payment.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [sessionId]);

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
//       <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
//         <Link href="/" className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline">
//           ← Back to Home
//         </Link>

//         {loading ? (
//           <>
//             <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
//             <h1 className="text-xl font-bold text-gray-900">Verifying Payment...</h1>
//             <p className="mt-2 text-gray-500">Please wait while we confirm your payment.</p>
//           </>
//         ) : error ? (
//           <>
//             <h1 className="text-2xl font-bold text-red-600">Payment Verification Failed</h1>
//             <p className="mt-3 text-gray-600">{error}</p>
//           </>
//         ) : payment ? (
//           <>
//             <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
//               ✓
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
//             <p className="mt-2 text-gray-500">Your payment has been verified successfully.</p>

//             <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-5 text-left">
//               <p className="text-gray-700"><strong>Service:</strong> {payment.serviceTitle}</p>
//               <p className="text-gray-700"><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
//               <p className="break-all text-gray-700"><strong>Transaction ID:</strong> {payment.transactionId}</p>
//             </div>
//           </>
//         ) : null}

//         {!loading && (
//           <Link href="/dashboard/customer/bookings" className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
//             Back to My Bookings
//           </Link>
//         )}
//       </div>
//     </main>
//   );
// }
// export default function PaymentSuccessPage() {
//   return (
//     <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading payment details...</div>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Payment {
  amount: number;
  transactionId: string;
  serviceTitle: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const verifyPayment = async () => {
      if (!sessionId) {
        setError("Payment session ID not found.");
        setLoading(false);
        return;
      }

      hasVerified.current = true;

      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Payment verification failed.");
        }

        setPayment(data.payment);
      } catch (error) {
        console.error("Payment verification error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while verifying your payment.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    // <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
    //   <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
    //     <Link href="/" className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline">
    //       ← Back to Home
    //     </Link>

    //     {loading ? (
    //       <>
    //         <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
    //         <h1 className="text-xl font-bold text-gray-900">Verifying Payment...</h1>
    //         <p className="mt-2 text-gray-500">Please wait while we confirm your payment.</p>
    //       </>
    //     ) : error ? (
    //       <>
    //         <h1 className="text-2xl font-bold text-red-600">Payment Verification Failed</h1>
    //         <p className="mt-3 text-gray-600">{error}</p>
    //       </>
    //     ) : payment ? (
    //       <>
    //         <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
    //           ✓
    //         </div>
    //         <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
    //         <p className="mt-2 text-gray-500">Your payment has been verified successfully.</p>

    //         <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-5 text-left">
    //           <p className="text-gray-700"><strong>Service:</strong> {payment.serviceTitle}</p>
    //           <p className="text-gray-700"><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
    //           <p className="break-all text-gray-700"><strong>Transaction ID:</strong> {payment.transactionId}</p>
    //         </div>
    //       </>
    //     ) : null}

    //     {!loading && (
    //       <Link href="/dashboard/customer/bookings" className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
    //         Back to My Bookings
    //       </Link>
    //     )}
    //   </div>
    // </main>
    <main className="flex min-h-screen items-center justify-center bg-[#10233F] px-4 py-10 sm:px-6 sm:py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#345071] bg-[#1B3658] p-6 text-center shadow-xl sm:p-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
        >
          ← Back to Home
        </Link>

        {loading ? (
          <>
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#45617F] border-t-blue-500"></div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Verifying Payment...
            </h1>
            <p className="mt-2 text-sm text-gray-300 sm:text-base">
              Please wait while we confirm your payment.
            </p>
          </>
        ) : error ? (
          <>
            <h1 className="text-2xl font-bold text-red-400 sm:text-3xl">
              Payment Verification Failed
            </h1>
            <p className="mt-3 wrap-break-word text-sm text-gray-300 sm:text-base">
              {error}
            </p>
          </>
        ) : payment ? (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/15 text-3xl font-bold text-green-400">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Payment Successful!
            </h1>
            <p className="mt-2 text-sm text-gray-300 sm:text-base">
              Your payment has been verified successfully.
            </p>

            <div className="mt-6 space-y-4 rounded-xl border border-[#345071] bg-[#264669] p-4 text-left sm:p-5">
              <p className="wrap-break-word text-sm text-gray-200 sm:text-base">
                <strong className="text-white">Service:</strong>{" "}
                {payment.serviceTitle}
              </p>
              <p className="text-sm text-gray-200 sm:text-base">
                <strong className="text-white">Amount:</strong> $
                {payment.amount.toFixed(2)}
              </p>
              <p className="break-all text-sm text-gray-200 sm:text-base">
                <strong className="text-white">Transaction ID:</strong>{" "}
                {payment.transactionId}
              </p>
            </div>
          </>
        ) : null}

        {!loading && (
          <Link
            href="/dashboard/customer/bookings"
            className="mt-7 inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:text-base"
          >
            Back to My Bookings
          </Link>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading payment details...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
