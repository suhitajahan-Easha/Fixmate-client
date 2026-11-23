

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dasboardsidebar";
import DashboardTopbar from "./_components/dashboardtopbar";
import { getSession } from "@/lib/serverApi/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="min-w-0 flex-1">
        <DashboardTopbar />
        {/* <div className="flex h-12 items-center bg-[#02112f] px-4">
          <SidebarTrigger className="border-0 bg-transparent text-white hover:bg-[#172F50] hover:text-white" />
        </div> */}
        {/* <DashboardTopbar /> */}
        {children}
      </main>

      {/* <Toaster /> */}
    </SidebarProvider>
  );
};

export default DashboardLayout;
