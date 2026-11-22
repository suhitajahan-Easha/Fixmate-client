
// import Image from "next/image";
// import Link from "next/link";

// const Hero = () => {
//   return (
//     <section className="relative flex min-h-150 items-center overflow-hidden bg-[#10233F]">
//       {/* Background Image */}
//       <Image
//         src="/banner.jpg"
//         alt="Professional technician repairing a home appliance"
//         fill
//         priority
//         sizes="100vw"
//         className="object-cover object-center"
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-linear-to-r from-[#10233F] via-[#10233F]/90 to-[#10233F]/30" />

//       {/* Content */}
//       <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
//         <div className="max-w-2xl">
//           <span className="mb-5 inline-block rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-200">
//             REPAIR MADE EASY
//           </span>

//           <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
//             Expert Repairs.
//             <span className="mt-2 block text-blue-400">
//               Right at Your Doorstep.
//             </span>
//           </h1>

//           <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
//             From everyday appliances to personal devices, find trusted
//             technicians and get your repairs done with confidence.
//           </p>

//           {/* CTA Buttons */}
//           <div className="mt-9 flex flex-col gap-4 sm:flex-row">
//             <Link
//               href="/about"
//               className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700"
//             >
//               Learn More →
//             </Link>

//             <Link
//               href="/services"
//               className="rounded-lg border border-white/50 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white hover:text-[#10233F]"
//             >
//               Explore Services
//             </Link>
//           </div>

//           <p className="mt-8 text-sm text-gray-400">
//             Find the right technician for your repair needs.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// import Image from "next/image";
// import Link from "next/link";

// const Hero = () => {
//   return (
//     <section className="relative overflow-hidden bg-[#10233F]">
//       {/* Background Decorations */}
//       <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

//       <div className="relative mx-auto grid min-h-[650px] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">

//         {/* Left Content */}
//         <div className="max-w-xl">
//           <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-300">
//             <span className="h-2 w-2 rounded-full bg-blue-400" />
//             RELIABLE REPAIR SOLUTIONS
//           </span>

//           <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
//             Keeping Your Devices
//             <span className="mt-2 block text-blue-400">
//               Running Smoothly.
//             </span>
//           </h1>

//           <p className="mt-6 max-w-lg text-base leading-7 text-gray-300 sm:text-lg">
//             Connect with trusted technicians for professional home appliance
//             and device repairs. Quality service, convenient booking, and
//             reliable solutions.
//           </p>

//           {/* CTA Buttons */}
//           <div className="mt-9 flex flex-col gap-4 sm:flex-row">
//             <Link
//               href="/services"
//               className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
//             >
//               Explore Services →
//             </Link>

//             <Link
//               href="/about"
//               className="rounded-lg border border-blue-300/40 bg-white/5 px-7 py-3.5 text-center font-semibold text-white transition hover:border-blue-400 hover:bg-blue-400/10"
//             >
//               Learn More
//             </Link>
//           </div>

//           {/* Feature Text */}
//           <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
//             <span className="flex items-center gap-2">
//               <span className="text-blue-400">✓</span>
//               Trusted Technicians
//             </span>
//             <span className="flex items-center gap-2">
//               <span className="text-blue-400">✓</span>
//               Convenient Booking
//             </span>
//             <span className="flex items-center gap-2">
//               <span className="text-blue-400">✓</span>
//               Reliable Repairs
//             </span>
//           </div>
//         </div>

//         {/* Right Image Panel */}
//         <div className="relative mx-auto w-full max-w-xl">
//           <div className="absolute -inset-3 rounded-3xl bg-blue-500/10 blur-xl" />

//           <div className="relative overflow-hidden rounded-2xl border border-blue-300/20 bg-[#1B3658] p-2 shadow-2xl shadow-black/30">
//             <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
//               <Image
//                 src="/banner.jpg"
//                 alt="Professional technician repairing a home appliance"
//                 fill
//                 priority
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#10233F]/50 via-transparent to-transparent" />
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-4 sm:px-4">
//               <div>
//                 <p className="text-sm font-semibold text-white">
//                   Expert Repair Services
//                 </p>
//                 <p className="mt-1 text-xs text-gray-400">
//                   Professional care for your devices
//                 </p>
//               </div>

//               <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-xl text-blue-400">
//                 ✓
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Hero;


import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#10233F]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        {/* Hero Content */}
        <div className="w-full max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium tracking-wide text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            RELIABLE REPAIR SOLUTIONS
          </span>

          <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            Keeping Your Devices
            <span className="mt-2 block text-blue-400">
              Running Smoothly.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Connect with trusted technicians for professional home appliance
            and device repairs. Quality service, convenient booking, and
            reliable solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explore Services →
            </Link>

            <Link
              href="/about"
              className="rounded-lg border border-blue-300/40 bg-white/5 px-7 py-3.5 text-center font-semibold text-white transition hover:border-blue-400 hover:bg-blue-400/10"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image Panel */}
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-blue-300/20 bg-[#1B3658] p-2 shadow-2xl shadow-black/30">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl sm:aspect-[21/9]">
              <Image
                src="/banner.jpg"
                alt="Professional technician repairing a home appliance"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10233F]/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Feature Row */}
        <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-300">
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✓</span>
            Home Appliance Repair
          </span>
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✓</span>
            Device Repair
          </span>
          <span className="flex items-center gap-2">
            <span className="text-blue-400">✓</span>
            Expert Technicians
          </span>
        </div>

      </div>
    </section>
  );
};

export default Hero;


