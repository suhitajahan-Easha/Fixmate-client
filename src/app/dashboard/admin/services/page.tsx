import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ServiceApprovalActions from "../../_components/serviceapprovalAdmin";

type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  technicianId: string;
  technicianName: string;
  technicianEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isAvailable: boolean;
};

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminServicesPage({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="p-8 text-center">
        <p>Please sign in to view this page.</p>
        <Link href="/sign-in" className="mt-4 inline-block text-blue-600">
          Sign In
        </Link>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="p-8 text-center">
        You are not authorized to view this page.
      </div>
    );
  }

  const user = session.user;
  const { status } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services?id=${user.id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    return <div className="p-8 text-center">Failed to load services.</div>;
  }

  const data = await response.json();
  const allServices: Service[] = data.result || [];

  const pendingServices = allServices.filter(
    (service) => service.approvalStatus === "pending",
  );

  const approvedServices = allServices.filter(
    (service) => service.approvalStatus === "approved",
  );

  const rejectedServices = allServices.filter(
    (service) => service.approvalStatus === "rejected",
  );

  const activeFilter = ["all", "pending", "approved", "rejected"].includes(
    status || "",
  )
    ? status || "pending"
    : "pending";

  const filteredServices =
    activeFilter === "all"
      ? allServices
      : allServices.filter(
          (service) => service.approvalStatus === activeFilter,
        );

  const filters = [
    { label: "Pending", value: "pending", count: pendingServices.length },
    { label: "All", value: "all", count: allServices.length },
    { label: "Approved", value: "approved", count: approvedServices.length },
    { label: "Rejected", value: "rejected", count: rejectedServices.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Back to Home
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Service Approval
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage services submitted by technicians.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Total Services</p>
            <h2 className="mt-2 text-2xl font-bold">{allServices.length}</h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-amber-600">Pending Services</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-600">
              {pendingServices.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-green-600">Approved Services</p>
            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {approvedServices.length}
            </h2>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={`/dashboard/admin/services?status=${filter.value}`}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter.value
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
              }`}
            >
              {filter.label} ({filter.count})
            </Link>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border bg-white md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Technician</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-6 py-4 text-left">Availability</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredServices.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {service.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {service.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{service.technicianName}</p>
                      <p className="text-xs text-gray-500">
                        {service.technicianEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      ${service.basePrice}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${service.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {service.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          service.approvalStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : service.approvalStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {service.approvalStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {/* {service.approvalStatus === "pending" ? (
                        <ServiceApprovalActions serviceId={service._id} userId={user.id} />
                      ) : (
                        <span className="text-xs text-gray-400">Reviewed</span>
                      )} */}
                      <ServiceApprovalActions
                        serviceId={service._id}
                        userId={user.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                  <p className="mt-1 font-semibold">৳{service.basePrice}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Availability</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${service.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {service.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      service.approvalStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : service.approvalStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {service.approvalStatus}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t pt-3">
                <p className="text-sm font-medium text-gray-700">
                  {service.technicianName}
                </p>
                <p className="text-xs text-gray-500">
                  {service.technicianEmail}
                </p>
              </div>

              {/* {service.approvalStatus === "pending" && (
                <div className="mt-4">
                  <ServiceApprovalActions serviceId={service._id} userId={user.id} />
                </div>
              )} */}
              <ServiceApprovalActions
                serviceId={service._id}
                userId={user.id}
              />
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="rounded-xl border bg-white px-4 py-12 text-center">
            <h3 className="font-semibold text-gray-800">No services found</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no services in this approval status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
