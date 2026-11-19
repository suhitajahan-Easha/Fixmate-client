
import RequestRepairButton from "@/components/ui/Home/Requestrepairbuttoncustomer";
import { Service, Technician } from "@/lib/type";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Wrench, ShieldCheck, Wallet, CalendarCheck } from "lucide-react";
import TechnicianAvatar from "@/components/ui/services/technicianavater";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({ params }: Props) {
  const { id } = await params;

  let service: Service;
  let technician: Technician | null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`
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
   
    <main className="min-h-screen bg-[#02112f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Back to Services */}
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-blue-400">
          <ArrowLeft size={17} /> Back to Services
        </Link>

        {/* Service Image */}
        <section className="overflow-hidden rounded-2xl border border-[#29415F] bg-[#1B3658]">
          <div className="relative h-64 sm:h-80 md:h-105">
            {service.image ? (
              <Image src={service.image} alt={service.title} fill priority sizes="(max-width: 768px) 100vw, 1200px" unoptimized className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#1B3658]">
                <Wrench size={60} className="text-blue-400" />
              </div>
            )}
          </div>

          <div className="space-y-4 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                {service.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Available Service
              </span>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              {service.title}
            </h1>

            <p className="max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">
              {service.description}
            </p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Wallet size={18} className="text-blue-400" />
              Starting Price
            </div>
            <h2 className="mt-3 text-2xl font-bold text-blue-400">
              ${Number(service.basePrice).toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock size={18} className="text-blue-400" />
              Estimated Duration
            </div>
            <h2 className="mt-3 text-xl font-bold text-white">
              {service.estimatedDuration}
            </h2>
          </div>

          <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Wrench size={18} className="text-blue-400" />
              Service Mode
            </div>
            <h2 className="mt-3 text-xl font-bold capitalize text-white">
              {service.serviceMode.replaceAll("-", " ")}
            </h2>
          </div>
        </section>

        {/* Service Information and Technician */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Service Information */}
          <div className="space-y-5 rounded-xl border border-[#29415F] bg-[#1B3658] p-5 sm:p-6">
            <div>
              <h2 className="text-xl font-bold">About This Service</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                {service.description}
              </p>
            </div>

            <div className="flex items-start gap-3 border-t border-[#345071] pt-4">
              <MapPin size={20} className="mt-0.5 shrink-0 text-blue-400" />
              <div>
                <p className="font-medium text-white">Service Area</p>
                <p className="mt-1 text-sm text-gray-300">
                  {service.serviceArea}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-[#345071] pt-4">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-blue-400" />
              <div>
                <p className="font-medium text-white">Service Availability</p>
                <p className="mt-1 text-sm text-gray-300">
                  This service is currently available for booking.
                </p>
              </div>
            </div>
          </div>

          {/* Technician Information */}
          <div className="space-y-5 rounded-xl border border-[#29415F] bg-[#1B3658] p-5 sm:p-6">
            <div>
              <p className="text-sm font-medium text-blue-400">SERVICE PROFESSIONAL</p>
              <h2 className="mt-1 text-xl font-bold">Your Technician</h2>
            </div>

            {technician ? (
              <>
                <div className="flex items-center gap-4">
                  <TechnicianAvatar image={technician.image} name={technician.name} />
                  <div className="min-w-0">
                    <h3 className="wrap-break-word text-lg font-semibold text-white">
                      {technician.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-300">
                      <MapPin size={15} className="text-blue-400" />
                      {technician.area || "Area not provided"}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-[#264669] p-4">
                  <p className="mb-2 text-sm font-semibold text-white">About Technician</p>
                  <p className="text-sm leading-7 text-gray-300">
                    {technician.bio || "No technician bio available."}
                  </p>
                </div>
              </>
            ) : (
              <p className="rounded-lg bg-[#264669] p-4 text-sm leading-6 text-gray-300">
                Technician information is currently unavailable.
              </p>
            )}
          </div>
        </section>

        {/* Request Repair */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#29415F] bg-[#1B3658] p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-300">Starting from</p>
            <h2 className="mt-1 text-3xl font-bold text-blue-400">
              ${Number(service.basePrice).toFixed(2)}
            </h2>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              Secure payment through Stripe after service completion.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <RequestRepairButton serviceId={service._id} basePrice={service.basePrice} />
          </div>
        </section>

        {/* Payment Information */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          <CalendarCheck size={20} className="mt-0.5 shrink-0 text-blue-400" />
          <p className="text-sm leading-6 text-gray-300">
            You can pay after the technician completes your repair. Your payment is processed securely through Stripe.
          </p>
        </div>

      </div>
    </main>
    
  );
}
