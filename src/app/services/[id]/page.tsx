
import RequestRepairButton from "@/components/ui/Home/Requestrepairbuttoncustomer";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

type Service = {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
  technicianEmail: string;
};

type Technician = {
  name: string;
  email: string;
  image?: string;
  area?: string;
  bio?: string;
};

export default async function ServiceDetailsPage({ params }: Props) {
  const { id } = await params;

  let service: Service;
  let technician: Technician | null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
      { cache: "no-store" }
    );

    if (response.status === 404 || response.status === 400) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }

    const data = await response.json();

    service = data.result;
    technician = data.technician;
  } catch (error) {
    console.error("Service details error:", error);
    throw error;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Back to Services */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Back to Services
        </Link>

        {/* Service Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-64 w-full object-cover md:h-96"
          />
        </div>

        {/* Service Title */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {service.category}
            </span>
            <span className="text-sm text-green-600">
              ● Available Service
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {service.title}
          </h1>

          <p className="max-w-3xl text-gray-600">
            {service.description}
          </p>
        </div>

        {/* Service Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Starting Price</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              ${Number(service.basePrice).toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Estimated Duration</p>
            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {service.estimatedDuration}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Service Mode</p>
            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {service.serviceMode}
            </h2>
          </div>
        </div>

        {/* Service Description and Technician */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Service Information */}
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              About This Service
            </h2>

            <p className="leading-7 text-gray-600">
              {service.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍</span>
              <span>Service Area: {service.serviceArea}</span>
            </div>
          </div>

          {/* Technician Information */}
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Your Technician
            </h2>

            {technician ? (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={technician.image || "/default-avatar.png"}
                    alt={technician.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {technician.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {technician.area || "Area not provided"}
                    </p>
                  </div>
                </div>

                <p className="leading-7 text-gray-600">
                  {technician.bio || "No technician bio available."}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Technician information is currently unavailable.
              </p>
            )}
          </div>
        </div>

        {/* Request Repair */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <h2 className="text-3xl font-bold text-blue-600">
              ${Number(service.basePrice).toFixed(2)}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Secure payment through Stripe after service completion.
            </p>
          </div>

          {/* <button
            disabled
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white opacity-60"
          >
            Request Repair
          </button> */}
          <RequestRepairButton serviceId={service._id} basePrice={service.basePrice} />
        </div>

      </div>
    </div>
  );
}
