// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { DashboardSidebar } from "./_components/dasboardsidebar";



// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//     return (
        
//         <SidebarProvider>
//             <DashboardSidebar></DashboardSidebar>
//             <main className="min-w-0 flex-1">
//                 <SidebarTrigger />
//                 {children}
//             </main>
//             {/* <Toaster></Toaster> */}
             
//         </SidebarProvider>
//     )
// };

// export default DashboardLayout;

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dasboardsidebar";
import DashboardTopbar from "./_components/dashboardtopbar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        <DashboardTopbar />
        {children}
      </main>

      {/* <Toaster /> */}
    </SidebarProvider>
  );
};

export default DashboardLayout;