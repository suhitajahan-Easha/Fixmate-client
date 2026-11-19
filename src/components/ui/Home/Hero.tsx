
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#10233F]">
      {/* Background Image */}
      <Image
        src="/hero.jfif"
        alt="Professional technician repairing a home appliance"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10233F] via-[#10233F]/90 to-[#10233F]/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <span className="mb-5 inline-block rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-200">
            REPAIR MADE EASY
          </span>

          <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            Expert Repairs.
            <span className="mt-2 block text-blue-400">
              Right at Your Doorstep.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
            From everyday appliances to personal devices, find trusted
            technicians and get your repairs done with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Create a Service →
            </Link>

            <Link
              href="/services"
              className="rounded-lg border border-white/50 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white hover:text-[#10233F]"
            >
              Explore Services
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Find the right technician for your repair needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
