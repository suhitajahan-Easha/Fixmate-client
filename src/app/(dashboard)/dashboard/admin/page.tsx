
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Users,
  Wrench,
  Clock,
  LoaderCircle,
  AlertCircle,
  ArrowRight,
  ClipboardCheck,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  createdAt: string;
}

interface PendingService {
  _id: string;
  title: string;
  category: string;
  technicianName: string;
  createdAt: string;
}

interface DashboardStats {
  totalUsers: number;
  totalTechnicians: number;
  pendingServices: number;
  recentUsers: AdminUser[];
  recentPendingServices: PendingService[];
}

const AdminDashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTechnicians: 0,
    pendingServices: 0,
    recentUsers: [],
    recentPendingServices: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchDashboardStats = async () => {
      const { data, error } = await authClient.token();
            const token = data?.token;
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-stats?userId=${userId}`,
          { cache: "no-store",
            headers:{
                  authorization:`Bearer ${token}`,
                }
           }
        );

        const ddata = await response.json();

        if (!response.ok) {
          throw new Error(ddata.message || "Failed to load dashboard");
        }

        setStats(ddata.result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [userId, isPending]);

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Technicians",
      value: stats.totalTechnicians,
      icon: Wrench,
      color: "text-purple-400",
    },
    {
      title: "Pending Services",
      value: stats.pendingServices,
      icon: Clock,
      color: "text-yellow-400",
    },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/15 text-purple-300";
      case "technician":
        return "bg-blue-500/15 text-blue-300";
      default:
        return "bg-gray-500/15 text-gray-300";
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#10233F] text-white">
        <div className="text-center">
          <LoaderCircle size={40} className="mx-auto animate-spin text-blue-400" />
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
        <p className="mt-2 text-gray-300">Sign in to view your admin dashboard.</p>
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
            Monitor users, technicians, and service approval activity.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => (
            <div key={card.title} className="rounded-xl border border-[#345071] bg-[#1B3658] p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">{card.title}</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">{card.value}</h2>
                </div>
                <div className="rounded-xl bg-[#264669] p-3">
                  <card.icon size={27} className={card.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Users */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">Recent Users</h2>
                <p className="mt-1 text-xs text-gray-400">Latest registered accounts</p>
              </div>
              <Link href="/dashboard/admin/users" className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-400 transition hover:text-blue-300">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {stats.recentUsers.length === 0 ? (
              <div className="rounded-lg bg-[#264669] px-4 py-10 text-center">
                <Users size={35} className="mx-auto text-blue-400" />
                <h3 className="mt-3 font-semibold text-white">No Users Found</h3>
                <p className="mt-2 text-sm text-gray-300">Registered accounts will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentUsers.map((user) => (
                  <div key={user._id} className="flex flex-col gap-3 rounded-lg bg-[#264669] p-3 sm:flex-row sm:items-center">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#345071]">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} fill unoptimized className="object-cover" />
                      ) : (
                        <UserRound size={22} className="text-blue-300" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-white">{user.name}</h3>
                      <p className="truncate text-xs text-gray-300">{user.email}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Joined: {formatDate(user.createdAt)}
                      </p>
                    </div>

                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6">
            <h2 className="text-lg font-bold text-white sm:text-xl">Quick Actions</h2>
            <p className="mt-1 text-xs text-gray-400">Manage your platform</p>

            <div className="mt-5 space-y-3">
              <Link href="/dashboard/admin/users" className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition hover:bg-blue-600">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-blue-300" />
                  <span className="text-sm font-medium text-white">Manage Users</span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>

              <Link href="/dashboard/admin/services" className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition hover:bg-blue-600">
                <div className="flex items-center gap-3">
                  <Wrench size={20} className="text-blue-300" />
                  <span className="text-sm font-medium text-white">Manage Services</span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>

              <Link href="/dashboard/admin/services?status=pending" className="flex items-center justify-between rounded-lg bg-[#264669] p-4 transition hover:bg-blue-600">
                <div className="flex items-center gap-3">
                  <ClipboardCheck size={20} className="text-yellow-300" />
                  <span className="text-sm font-medium text-white">Review Services</span>
                </div>
                <ArrowRight size={17} className="text-gray-300" />
              </Link>
            </div>
          </div>

          {/* Pending Services */}
          <div className="rounded-xl border border-[#345071] bg-[#1B3658] p-4 shadow-lg sm:p-6 lg:col-span-3">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">Pending Services</h2>
                <p className="mt-1 text-xs text-gray-400">Services waiting for your approval</p>
              </div>
              <Link href="/dashboard/admin/services?status=pending" className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-400 transition hover:text-blue-300">
                Review All <ArrowRight size={16} />
              </Link>
            </div>

            {stats.recentPendingServices.length === 0 ? (
              <div className="rounded-lg bg-[#264669] px-4 py-10 text-center">
                <ClipboardCheck size={35} className="mx-auto text-blue-400" />
                <h3 className="mt-3 font-semibold text-white">No Pending Services</h3>
                <p className="mt-2 text-sm text-gray-300">New services waiting for approval will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {stats.recentPendingServices.map((service) => (
                  <div key={service._id} className="rounded-lg bg-[#264669] p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">{service.title}</h3>
                        <p className="mt-1 text-xs text-gray-300">{service.category}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-yellow-500/15 px-2.5 py-1 text-xs text-yellow-300">
                        Pending
                      </span>
                    </div>
                    <div className="mt-4 border-t border-[#45617F] pt-3">
                      <p className="text-xs text-gray-300">
                        Technician: {service.technicianName || "Not available"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Submitted: {formatDate(service.createdAt)}
                      </p>
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

export default AdminDashboard;
