

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserRound, Wrench, ShieldCheck, CalendarCheck, Wallet, Users } from "lucide-react";


export default function AboutPage() {
  return (
   
    <main className="min-h-screen bg-[#02112f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Back to Home */}
        {/* <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-blue-400">
          <ArrowRight className="rotate-180" size={16} /> Back to Home
        </Link> */}

        {/* Hero Section */}
        <section className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">About FixMate</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Making Repairs Easier, More Reliable.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-gray-300">
              FixMate connects customers with repair professionals through a simple and convenient platform. From finding services to managing repair requests, we make the process easier.
            </p>
            <Link href="/services" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Explore Services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative h-64 overflow-hidden rounded-2xl border border-[#29415F] sm:h-80 md:h-96">
            <Image src="/aboutone.jpg" alt="Technician working on a repair" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-12 md:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">Who We Are</p>
            <h2 className="text-2xl font-bold sm:text-3xl">One Platform. Two Sides. One Solution.</h2>
            <p className="mt-3 text-gray-300">
              FixMate brings customers and technicians together in one organized repair-service platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[#29415F] bg-[#1B3658]">
              <div className="relative h-56 sm:h-64">
                <Image src="/abouttwo.jpg" alt="Customer using a smartphone" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-blue-400">
                  <UserRound size={22} />
                  <h3 className="text-xl font-semibold text-white">For Customers</h3>
                </div>
                <p className="leading-7 text-gray-300">
                  Discover available repair services, request repairs, track booking progress, and manage your service requests from one place.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#29415F] bg-[#1B3658]">
              <div className="relative h-56 sm:h-64">
                <Image src="/about3.jpg" alt="Technician working on an appliance" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-blue-400">
                  <Wrench size={22} />
                  <h3 className="text-xl font-semibold text-white">For Technicians</h3>
                </div>
                <p className="leading-7 text-gray-300">
                  Add repair services, manage customer requests, and keep track of your assigned repair jobs through your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-12 md:py-16">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">Our Purpose</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Mission & Vision</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#29415F] bg-[#1B3658] p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 leading-7 text-gray-300">
                To make repair services easier to discover, request, and manage by connecting customers with technicians through one convenient platform.
              </p>
            </div>

            <div className="rounded-2xl border border-[#29415F] bg-[#1B3658] p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Users size={26} />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 leading-7 text-gray-300">
                To create a connected repair-service experience where customers can find suitable services and technicians can manage their work more easily.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes FixMate Different */}
        <section className="py-12 md:py-16">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">Why FixMate</p>
            <h2 className="text-2xl font-bold sm:text-3xl">What Makes Our Platform Different?</h2>
            <p className="mt-3 text-gray-300">Useful features designed to organize the repair-service experience.</p>
          </div>

          <div className="relative mb-8 h-56 overflow-hidden rounded-2xl border border-[#29415F] sm:h-72">
            <Image src="/about4.jpg" alt="Professional repair work" fill sizes="100vw" className="object-cover" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
              <UserRound className="mb-3 text-blue-400" size={28} />
              <h3 className="font-semibold">Technician Profiles</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">Explore technician information and their listed services.</p>
            </div>

            <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
              <ShieldCheck className="mb-3 text-blue-400" size={28} />
              <h3 className="font-semibold">Service Approval</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">Admin reviews submitted services before they become available to customers.</p>
            </div>

            <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
              <Wallet className="mb-3 text-blue-400" size={28} />
              <h3 className="font-semibold">Pay After Service</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">Customers can pay for a completed repair through online checkout.</p>
            </div>

            <div className="rounded-xl border border-[#29415F] bg-[#1B3658] p-5">
              <CalendarCheck className="mb-3 text-blue-400" size={28} />
              <h3 className="font-semibold">Booking Management</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">Customers and technicians can manage repair requests and booking progress.</p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-12 md:py-16">
          <div className="grid items-center gap-6 rounded-2xl border border-[#29415F] bg-[#1B3658] p-6 sm:p-8 md:grid-cols-2 md:p-10">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">Our Commitment</p>
              <h2 className="text-2xl font-bold sm:text-3xl">A Better Experience, Every Step of the Way.</h2>
              <p className="mt-4 leading-7 text-gray-300">
                We aim to make repair requests more organized and convenient by bringing service discovery, booking management, and payment into one platform.
              </p>
            </div>
            <div className="relative h-56 overflow-hidden rounded-xl sm:h-64">
              <Image src="/about5.jpg" alt="Technician carefully working on a repair" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-10 rounded-2xl bg-blue-600 px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Need a Repair?</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Explore available services and find the right repair solution for your needs.
          </p>
          <Link href="/services" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-gray-100">
            Explore Services <ArrowRight size={18} />
          </Link>
        </section>

      </div>
    </main>
    
  );
}
