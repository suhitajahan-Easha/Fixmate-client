
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type Payment = {
  _id: string;
  serviceTitle: string;
  technicianName: string;
  amount: number;
  transactionId: string;
  paidAt: string;
};

async function getPayments(userId: string) {
    const jwttoken=await auth.api.getToken({
      headers:await headers()
    })
    
    const token=jwttoken?.token
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments?userId=${userId}`,
      { cache: "no-store",
        headers:{
                  authorization:`Bearer ${token}`,
                } 

      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }

    const data = await response.json();

    return {
      payments: data.result || [],
      totalAmountPaid: Number(data.totalRevenue || 0),
    };
  } catch (error) {
    console.error("Payment history error:", error);

    return {
      payments: [],
      totalAmountPaid: 0,
    };
  }
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatDate = (date: string) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default async function CustomerPaymentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.role !== "customer") {
    redirect("/dashboard");
  }

  const { payments, totalAmountPaid } = await getPayments(session.user.id);
  const latestPayment = payments[0];

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Payment History
          </h1>
          <p className="mt-2 text-sm text-gray-300 sm:text-base">
            View your completed payments and transaction details.
          </p>
        </div>

        {/* Total Amount Paid */}
        <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5 sm:p-7">
          <p className="text-sm text-gray-300">
            Total Amount Paid
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400 sm:text-4xl">
            {formatAmount(totalAmountPaid)}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {payments.length} successful {payments.length === 1 ? "transaction" : "transactions"}
          </p>
        </div>

        {/* Payment Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5">
            <p className="text-sm text-gray-300">
              Latest Payment
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {latestPayment ? formatAmount(latestPayment.amount) : "$0.00"}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              {latestPayment?.serviceTitle || "No payment yet"}
            </p>
          </div>

          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5">
            <p className="text-sm text-gray-300">
              Last Paid
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {latestPayment ? formatDate(latestPayment.paidAt) : "N/A"}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Most recent transaction date
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <section className="overflow-hidden rounded-xl border border-[#345071] bg-[#1B3658]">
          <div className="border-b border-[#345071] p-5">
            <h2 className="text-lg font-semibold sm:text-xl">
              Transaction History
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Details of your previous payments.
            </p>
          </div>

          {payments.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <h3 className="text-lg font-semibold text-white">
                No Payments Yet
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Your completed payment transactions will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#142D4C] text-gray-300">
                    <tr>
                      <th className="px-5 py-4 font-medium">Service</th>
                      <th className="px-5 py-4 font-medium">Technician</th>
                      <th className="px-5 py-4 font-medium">Amount</th>
                      <th className="px-5 py-4 font-medium">Transaction ID</th>
                      <th className="px-5 py-4 font-medium">Payment Date</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#345071]">
                    {payments.map((payment: Payment) => (
                      <tr key={payment._id} className="transition hover:bg-[#264669]/50">
                        <td className="px-5 py-4 font-medium text-white">
                          {payment.serviceTitle}
                        </td>
                        <td className="px-5 py-4 text-gray-300">
                          {payment.technicianName}
                        </td>
                        <td className="px-5 py-4 font-semibold text-blue-400">
                          {formatAmount(payment.amount)}
                        </td>
                        <td className="max-w-48 break-all px-5 py-4 text-xs text-gray-300">
                          {payment.transactionId || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-gray-300">
                          {formatDate(payment.paidAt)}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-300">
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Payment Cards */}
              <div className="space-y-3 p-4 md:hidden">
                {payments.map((payment: Payment) => (
                  <div key={payment._id} className="space-y-3 rounded-lg border border-[#45617F] bg-[#264669] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {payment.serviceTitle}
                        </h3>
                        <p className="mt-1 text-xs text-gray-300">
                          {payment.technicianName}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-300">
                        Paid
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#45617F] pt-3">
                      <span className="text-sm text-gray-300">Amount</span>
                      <span className="font-bold text-blue-400">
                        {formatAmount(payment.amount)}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-gray-400">Transaction ID</p>
                        <p className="mt-1 break-all text-gray-200">
                          {payment.transactionId || "N/A"}
                        </p>
                      </div>

                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Payment Date</span>
                        <span className="text-gray-200">
                          {formatDate(payment.paidAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
