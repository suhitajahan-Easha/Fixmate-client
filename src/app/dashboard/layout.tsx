import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// import { Toaster } from "@/components/ui/toast";
import { DashboardSidebar } from "./_components/dasboardsidebar";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        
        <SidebarProvider>
            <DashboardSidebar></DashboardSidebar>
            <main className="min-w-0 flex-1">
                <SidebarTrigger />
                {children}
            </main>
            {/* <Toaster></Toaster> */}
             
        </SidebarProvider>
    )
};

export default DashboardLayout;