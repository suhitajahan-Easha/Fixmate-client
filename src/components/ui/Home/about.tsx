
import Link from "next/link";
import {
  Target,
  Lightbulb,
  Search,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    number: "01",
    title: "Easy Service Discovery",
    description: "Find repair services in one place.",
  },
  {
    number: "02",
    title: "Simple Booking Process",
    description: "Request a repair without unnecessary steps.",
  },
  {
    number: "03",
    title: "Transparent Job Tracking",
    description: "Follow your booking status.",
  },
  {
    number: "04",
    title: "Convenient Online Payment",
    description: "Pay when the repair is completed.",
  },
];

export default function AboutPage() {
  return (
    <section id="about" className="scroll-mt-24 bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl space-y-6 px-5">

        {/* Hero Section */}
        <div className="grid items-center gap-8 rounded-2xl bg-slate-800 p-6 md:grid-cols-2 md:p-10">
          <div>
            <span className="mb-5 inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300">
              ABOUT FIXMATE
            </span>

            <h2 className="mb-5 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
              Your Repair Partner, Every Step of the Way.
            </h2>

            <p className="max-w-lg leading-7 text-slate-300">
              We simplify how customers discover, book, and manage repair
              services. Find the right technician and make every repair
              experience easier.
            </p>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-80">
             <Image src="/About.webp" alt="Technician repairing a home appliance" fill priority className="object-cover" />
          </div>
        </div>

        {/* Who We Are */}
        <div className="rounded-2xl bg-white p-7 shadow-sm md:p-10">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Who We Are
          </h3>

          <p className="max-w-4xl leading-8 text-gray-600">
            FixMate is a service platform designed to make repair booking
            easier by connecting customers with technicians. We bring service
            discovery, booking, and payment together in one convenient place.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Target size={25} />
            </div>

            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Our Mission
            </h3>

            <p className="leading-7 text-gray-600">
              Make repair services more accessible and convenient by
              connecting customers with skilled technicians.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Lightbulb size={25} />
            </div>

            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Our Vision
            </h3>

            <p className="leading-7 text-gray-600">
              Build a trusted service community where customers and
              technicians can connect easily.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="rounded-2xl bg-white p-7 shadow-sm md:p-10">
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            What Makes Us Different?
          </h3>

          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.number} className="flex items-start gap-5 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <span className="text-2xl font-bold text-blue-600">
                  {feature.number}
                </span>

                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {feature.title}
                  </h4>

                  <p className="text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-blue-600 px-6 py-12 text-center md:py-14">
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Ready to Get It Fixed?
          </h3>

          <p className="mx-auto mb-7 max-w-xl leading-7 text-blue-100">
            Explore available repair services and find the right technician
            for your needs.
          </p>

          <Link href="/services" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
            Explore Services <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
