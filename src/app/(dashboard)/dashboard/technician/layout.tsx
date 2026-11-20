import { requireRole } from '@/lib/serverApi/server';
import React from 'react';


const TechnicianDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('technician');
    return children;
};

export default TechnicianDashboardLayout;