export const dynamic = "force-dynamic";
import Link from "next/link";
import ServiceCard from "./FeatureCard";

interface Service {
  _id: string;
  title: string;
  image: string;
  category: string;
  serviceMode: string;
  basePrice: number;
  technicianName: string;
}

const FeaturedServices = async () => {
  let services: Service[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services?limit=6`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();

    if (data.success) {
      services = data.result;
    }
  } catch (error) {
    console.error("Featured services error:", error);
  }

  return (
    
    <section className="bg-[#02112f] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            What We Offer
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Featured Repair Services
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Find trusted technicians and professional repair services for your
            everyday needs.
          </p>
        </div>

        {/* Service Cards */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-700 bg-[#1F2937] py-12 text-center">
            <p className="text-lg font-semibold text-white">
              No services available right now.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Please check back later.
            </p>
          </div>
        )}

        {/* View All Services */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg bg-[#2563EB] px-7 py-3 font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
