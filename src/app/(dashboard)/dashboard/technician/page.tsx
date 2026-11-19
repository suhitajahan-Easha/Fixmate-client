
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  Clock,
  ClipboardList,
  CalendarDays,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Service {
  _id: string;
  title: string;
  category: string;
  image?: string;
  approvalStatus: string;
  createdAt: string;
}

interface Booking {
  _id: string;
  serviceTitle: string;
  serviceImage?: string;
  customerName: string;
  preferredDate: string;
  status: string;
  createdAt: string;
}

const TechnicianDashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  const [services, setServices] = useState<Service[]>([]);
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

    const fetchDashboardData = async () => {
      const { data, error } = await authClient.token();
                  const token = data?.token;
      try {
        setLoading(true);
        setError("");

        const [serviceResponse, bookingResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?id=${userId}`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${userId}`, {
            cache: "no-store",
            headers:{
                  authorization:`Bearer ${token}`,
                }
          }),
        ]);

        const serviceData = await serviceResponse.json();
        const bookingData = await bookingResponse.json();

        if (!serviceResponse.ok) {
          throw new Error(serviceData.message || "Failed to load services");
        }

        if (!bookingResponse.ok) {
          throw new Error(bookingData.message || "Failed to load bookings");
        }

        const sortedServices = [...(serviceData.result || [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        const sortedBookings = [...(bookingData.result || [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setServices(sortedServices);
        setBookings(sortedBookings);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId, isPending]);

  // Dashboard statistics
  const totalServices = services.length;

  const approvedServices = services.filter(
    (service) => service.approvalStatus === "approved"
  ).length;

  const pendingRequests = bookings.filter(
    (booking) => booking.status === "requested"
  ).length;

  const recentServices = services.slice(0, 3);

  const recentRequests = bookings
    .filter((booking) => booking.status === "requested")
    .slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getApprovalStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/15 text-green-300";
      case "pending":
        return "bg-yellow-500/15 text-yellow-300";
      case "rejected":
        return "bg-red-500/15 text-red-300";
      default:
        return "bg-gray-500/15 text-gray-300";
    }
  };

  const stats = [
    {
      title: "Total Services",
      value: totalServices,
      icon: Wrench,
      color: "text-blue-400",
    },
    {
      title: "Approved Services",
      value: approvedServices,
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: Clock,
      color: "text-yellow-400",
    },
  ];

  // Loading state
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
          Sign in to view your technician dashboard.
        </p>
        <Link href="/sign-in" className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Sign In
        </Link>
        <Link href="/" className="mt-4 text-sm text-blue-300 hover:text-blue-200">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10233F] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to Home */}
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-white">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-gray-300 sm:text-base">
            Manage your repair services and customer requests.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Services */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6 lg:col-span-2">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Recent Services
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Your latest added repair services
              </p>
            </div>

            {recentServices.length === 0 ? (
              <div className="rounded-lg bg-[#264669] px-4 py-10 text-center">
                <Wrench size={35} className="mx-auto text-blue-400" />
                <h3 className="mt-3 font-semibold text-white">
                  No Services Added Yet
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  Add your first repair service to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentServices.map((service) => (
                  <div key={service._id} className="flex flex-col gap-3 rounded-lg bg-[#264669] p-3 sm:flex-row sm:items-center">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#345071]">
                      {service.image ? (
                        <Image src={service.image} alt={service.title} fill unoptimized className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Wrench size={25} className="text-blue-300" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-300">
                        {service.category}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Added: {formatDate(service.createdAt)}
                      </p>
                    </div>

                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${getApprovalStyle(service.approvalStatus)}`}>
                      {service.approvalStatus}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Requests */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Pending Requests
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Customer requests waiting for your response
              </p>
            </div>

            {recentRequests.length === 0 ? (
              <div className="rounded-lg bg-[#264669] px-4 py-10 text-center">
                <ClipboardList size={35} className="mx-auto text-blue-400" />
                <h3 className="mt-3 font-semibold text-white">
                  No Pending Requests
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  New customer requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRequests.map((booking) => (
                  <div key={booking._id} className="rounded-lg bg-[#264669] p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#345071]">
                        <UserRound size={20} className="text-blue-300" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-white">
                          {booking.customerName}
                        </h3>
                        <p className="mt-1 truncate text-xs text-gray-300">
                          {booking.serviceTitle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#45617F] pt-3">
                      <span className="flex items-center gap-1 text-xs text-gray-300">
                        <CalendarDays size={14} />
                        {formatDate(booking.preferredDate)}
                      </span>
                      <span className="rounded-full bg-yellow-500/15 px-2.5 py-1 text-xs text-yellow-300">
                        Requested
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;




