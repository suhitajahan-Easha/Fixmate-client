"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  CheckCircle,
  Search,
  CalendarDays,
  UserRound,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import StatsCard from "../_components/statscard";

interface Booking {
  _id: string;
  serviceTitle: string;
  serviceImage?: string;
  technicianName: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const CustomerDashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      const { data, error } = await authClient.token();
      const token = data?.token;
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${userId}`,
          {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        const ddata = await response.json();

        if (!response.ok) {
          throw new Error(ddata.message || "Failed to load bookings");
        }

        const sortedBookings = [...(ddata.result || [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setBookings(sortedBookings);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, isPending]);

  // Dashboard statistics
  const totalRequests = bookings.length;

  const activeJobs = bookings.filter((booking) =>
    ["requested", "accepted", "in-progress"].includes(booking.status),
  ).length;

  const completedJobs = bookings.filter(
    (booking) => booking.status === "completed",
  ).length;

  const recentBookings = bookings.slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-yellow-500/15 text-yellow-300";
      case "accepted":
        return "bg-blue-500/15 text-blue-300";
      case "in-progress":
        return "bg-purple-500/15 text-purple-300";
      case "completed":
        return "bg-green-500/15 text-green-300";
      case "cancelled":
      case "rejected":
        return "bg-red-500/15 text-red-300";
      default:
        return "bg-gray-500/15 text-gray-300";
    }
  };

  const stats = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: ClipboardList,
      color: "text-blue-400",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle,
      color: "text-green-400",
    },
  ];

  // Session loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#10233F] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-blue-400"></div>
          <p className="mt-4 text-sm text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#10233F] px-4 text-center">
        <h2 className="text-2xl font-bold text-white">Please Sign In</h2>
        <p className="mt-2 text-gray-300">
          Sign in to view your customer dashboard.
        </p>
        <Link
          href="/sign-in"
          className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign In
        </Link>
        <Link
          href="/"
          className="mt-4 text-sm text-blue-300 hover:text-blue-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-gray-300 sm:text-base">
            Track your repair requests and manage your services.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        {/* <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-xl border border-[#345071] bg-[#1B3658] p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-white">
                    {stat.value}
                  </h2>
                </div>
                <div className="rounded-xl bg-[#264669] p-3">
                  <stat.icon size={27} className={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Bookings */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  Recent Bookings
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Your latest repair requests
                </p>
              </div>
              <Link
                href="/dashboard/customer/bookings"
                className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {loading ? (
              <p className="py-8 text-center text-gray-400">
                Loading bookings...
              </p>
            ) : recentBookings.length === 0 ? (
              <div className="rounded-lg bg-[#264669] px-4 py-10 text-center">
                <Wrench size={35} className="mx-auto text-blue-400" />
                <h3 className="mt-3 font-semibold text-white">
                  No Repair Requests Yet
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  Explore our services and book your first repair.
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Services <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col gap-3 rounded-lg bg-[#264669] p-3 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#345071]">
                      {booking.serviceImage ? (
                        <Image
                          src={booking.serviceImage}
                          alt={booking.serviceTitle}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Wrench size={25} className="text-blue-300" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">
                        {booking.serviceTitle}
                      </h3>
                      <p className="mt-1 text-xs text-gray-300">
                        Technician: {booking.technicianName}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(booking.preferredDate)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(booking.status)}`}
                      >
                        {booking.status.replace("-", " ")}
                      </span>
                      <span
                        className={`text-xs font-medium ${booking.paymentStatus === "paid" ? "text-green-400" : "text-yellow-300"}`}
                      >
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Quick Actions
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Easily access your account
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href="/services"
                className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition duration-200 hover:bg-blue-600"
              >
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-blue-300" />
                  <span className="text-sm font-medium text-white">
                    Explore Services
                  </span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>

              <Link
                href="/dashboard/customer/bookings"
                className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition duration-200 hover:bg-blue-600"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-blue-300" />
                  <span className="text-sm font-medium text-white">
                    My Bookings
                  </span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition duration-200 hover:bg-blue-600"
              >
                <div className="flex items-center gap-3">
                  <UserRound size={20} className="text-blue-300" />
                  <span className="text-sm font-medium text-white">
                    My Profile
                  </span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
