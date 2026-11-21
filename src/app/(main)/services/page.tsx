

import ServiceEmptyState from "@/components/ui/services/serviceemptystate";
import ServiceFilters from "@/components/ui/services/servicefilter";
import ServiceGrid from "@/components/ui/services/servicegrid";
import Link from "next/link";


type Service = {
  _id: string;
  title: string;
  category: string;
  image: string;
  serviceMode: "Home Visit" | "Shop Drop-off";
  serviceArea: string;
  basePrice: number;
  technicianName: string;
};

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    mode?: string;
    sort?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.mode) query.set("mode", params.mode);
  if (params.sort) query.set("sort", params.sort);

  let services: Service[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services?${query.toString()}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const data = await response.json();
      services = data.result || [];
    }
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  return (
    
    <main className="min-h-screen bg-[#02112f] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-blue-400">
          ← Back to Home
        </Link>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Find the Right Repair Service
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-300 md:text-base">
            Reliable technicians for your home appliances and devices. Find the right service for your needs.
          </p>
        </div>

        <ServiceFilters
          search={params.search}
          category={params.category}
          mode={params.mode}
          sort={params.sort}
        />

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-white">Available Services</h2>
            <p className="text-sm text-gray-300">
              {services.length} services found
            </p>
          </div>

          {services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <ServiceEmptyState />
          )}
        </section>
      </div>
    </main>
    
  );
}
