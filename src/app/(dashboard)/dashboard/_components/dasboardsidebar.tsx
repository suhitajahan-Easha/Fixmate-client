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
  useSidebar,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboard,
  HousePlug,
  Wrench,
  PlusCircle,
  ClipboardList,
  Users,
  CreditCard,
  UserRound,
  X,
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
      url: "/dashboard/technician/my-services",
      icon: Wrench,
    },
    {
      id: "add-service",
      name: "Add Service",
      url: "/dashboard/technician/add-service",
      icon: PlusCircle,
    },
    {
      id: "request",
      name: "Repair Requests",
      url: "/dashboard/technician/requests",
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
      id: "transactions",
      name: "Transactions",
      url: "/dashboard/admin/transactions",
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
  const { isMobile, setOpenMobile } = useSidebar();

  if (isPending) return null;

  const role = (session?.user?.role || "customer") as Role;
  const menuItems = menuItemsByRole[role] || menuItemsByRole.customer;

  return (
    <Sidebar className="!bg-[#02112f] !text-white border-r border-[#29415F]">
      {/* <SidebarHeader className="!bg-[#02112f] border-b border-[#29415F] px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <HousePlug size={21} />
          </div>
          <span className="text-xl font-bold text-white">FixMate</span>
        </Link>
      </SidebarHeader> */}
      <SidebarHeader className="!bg-[#02112f] border-b border-[#29415F] px-4 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <HousePlug size={21} />
            </div>
            <span className="text-xl font-bold text-white">FixMate</span>
          </Link>

          {isMobile && (
            <button
              onClick={() => setOpenMobile(false)}
              className="rounded-lg p-2 text-white transition hover:bg-[#172F50]"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="!bg-[#02112f] px-3 py-5">
        <SidebarGroup className="!bg-[#02112f]">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Dashboard Menu
          </p>

          <SidebarMenu className="gap-2">
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
                    onClick={() => setOpenMobile(false)}
                    isActive={isActive}
                    render={<Link href={item.url} />}
                    className={`h-11 rounded-lg px-3 transition-all duration-200 ${
                      isActive
                        ? "!bg-blue-600 !text-white hover:!bg-blue-700"
                        : "!bg-transparent !text-gray-300 hover:!bg-[#172F50] hover:!text-blue-300"
                    }`}
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

      <SidebarFooter className="!bg-[#02112f] border-t border-[#29415F] p-4">
        <p className="text-xs text-gray-400">FixMate Dashboard</p>
        <p className="mt-1 text-sm font-medium capitalize text-white">
          {role} Account
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
