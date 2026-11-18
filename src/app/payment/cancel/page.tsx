
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <Link href="/" className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline">
          ← Back to Home
        </Link>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
          ✕
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>

        <p className="mt-3 text-gray-500">
          Your payment was not completed. No payment has been recorded. You can try again from your bookings.
        </p>

        <Link href="/dashboard/customer/bookings" className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Back to My Bookings
        </Link>
      </div>
    </main>
  );
}
