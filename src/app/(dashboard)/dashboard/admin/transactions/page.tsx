
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type Payment = {
  _id: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  serviceTitle: string;
  amount: number;
  transactionId: string;
  paidAt: string;
};

async function getPayments(userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments?userId=${userId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();

    return {
      payments: data.result || [],
      totalRevenue: Number(data.totalRevenue || 0),
    };
  } catch (error) {
    console.error("Admin transactions error:", error);

    return {
      payments: [],
      totalRevenue: 0,
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

export default async function AdminTransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const { payments, totalRevenue } = await getPayments(session.user.id);

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-300 sm:text-base">
            Monitor all successful payments made through FixMate.
          </p>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-5 sm:p-7">
          <p className="text-sm text-gray-300">
            Total Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400 sm:text-4xl">
            {formatAmount(totalRevenue)}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            From {payments.length} successful {payments.length === 1 ? "transaction" : "transactions"}
          </p>
        </div>

        {/* Transaction History */}
        <section className="overflow-hidden rounded-xl border border-[#345071] bg-[#1B3658]">

          <div className="border-b border-[#345071] p-5">
            <h2 className="text-lg font-semibold sm:text-xl">
              All Transactions
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Complete payment records from all customers.
            </p>
          </div>

          {payments.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <h3 className="text-lg font-semibold text-white">
                No Transactions Yet
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Customer payment records will appear here after successful payments.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#142D4C] text-gray-300">
                    <tr>
                      <th className="px-5 py-4 font-medium">Customer</th>
                      <th className="px-5 py-4 font-medium">Technician</th>
                      <th className="px-5 py-4 font-medium">Service</th>
                      <th className="px-5 py-4 font-medium">Amount</th>
                      <th className="px-5 py-4 font-medium">Transaction ID</th>
                      <th className="px-5 py-4 font-medium">Payment Date</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#345071]">
                    {payments.map((payment: Payment) => (
                      <tr key={payment._id} className="transition hover:bg-[#264669]/50">

                        <td className="px-5 py-4">
                          <p className="font-medium text-white">
                            {payment.customerName || "N/A"}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {payment.customerEmail}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-medium text-white">
                            {payment.technicianName || "N/A"}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {payment.technicianEmail}
                          </p>
                        </td>

                        <td className="px-5 py-4 font-medium text-gray-200">
                          {payment.serviceTitle}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-blue-400">
                          {formatAmount(payment.amount)}
                        </td>

                        <td className="max-w-48 break-all px-5 py-4 text-xs text-gray-300">
                          {payment.transactionId || "N/A"}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-gray-300">
                          {formatDate(payment.paidAt)}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Transaction Cards */}
              <div className="space-y-3 p-4 md:hidden">
                {payments.map((payment: Payment) => (
                  <div key={payment._id} className="space-y-3 rounded-lg border border-[#45617F] bg-[#264669] p-4">

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {payment.serviceTitle}
                        </h3>
                        <p className="mt-1 text-xs text-gray-300">
                          {formatDate(payment.paidAt)}
                        </p>
                      </div>

                      <span className="shrink-0 font-bold text-blue-400">
                        {formatAmount(payment.amount)}
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-[#45617F] pt-3 text-xs">
                      <div>
                        <p className="text-gray-400">Customer</p>
                        <p className="mt-1 break-all text-gray-200">
                          {payment.customerName || "N/A"} ({payment.customerEmail || "N/A"})
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Technician</p>
                        <p className="mt-1 break-all text-gray-200">
                          {payment.technicianName || "N/A"} ({payment.technicianEmail || "N/A"})
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Transaction ID</p>
                        <p className="mt-1 break-all text-gray-200">
                          {payment.transactionId || "N/A"}
                        </p>
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
