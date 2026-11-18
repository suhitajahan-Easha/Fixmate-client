"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboard,
  Wrench,
  PlusCircle,
  ClipboardList,
  Users,
  CreditCard,
  UserRound,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

type Role = "customer" | "technician" | "admin";

type MenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

const menuItemsByRole: Record<Role, MenuItem[]> = {
  customer: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    { id: "services", name: "Browse Services", url: "/services", icon: Wrench },
    {
      id: "bookings",
      name: "My Bookings",
      url: "/dashboard/customer/bookings",
      icon: ClipboardList,
    },
    {
      id: "payments",
      name: "Payment History",
      url: "/dashboard/customer/payments",
      icon: CreditCard,
    },
    {
      id: "profile",
      name: "My Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  technician: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      id: "services",
      name: "My Services",
      url: "/dashboard/technician/services",
      icon: Wrench,
    },
    {
      id: "add-service",
      name: "Add Service",
      url: "/dashboard/technician/services/new",
      icon: PlusCircle,
    },
    {
      id: "request",
      name: "Repair Requests",
      url: "/dashboard/technician/My-Request",
      icon: ClipboardList,
    },
    {
      id: "profile",
      name: "My Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Manage Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "services",
      name: "Manage Services",
      url: "/dashboard/admin/services",
      icon: Wrench,
    },
    {
      id: "bookings",
      name: "All Bookings",
      url: "/dashboard/admin/bookings",
      icon: ClipboardCheck,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      id: "profile",
      name: "My Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],
};

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  if (isPending) return null;

  const role = (session?.user?.role || "customer") as Role;
  const menuItems = menuItemsByRole[role] || menuItemsByRole.customer;

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Wrench size={21} />
          </div>
          <span className="text-xl font-bold text-gray-900">FixMate</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Dashboard Menu
          </p>

          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive =
                pathname === item.url ||
                (item.url !== "/dashboard/customer" &&
                  item.url !== "/dashboard/technician" &&
                  item.url !== "/dashboard/admin" &&
                  pathname.startsWith(`${item.url}/`));

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-gray-400">FixMate Dashboard</p>
        <p className="text-sm font-medium capitalize text-gray-700">
          {role} Account
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
