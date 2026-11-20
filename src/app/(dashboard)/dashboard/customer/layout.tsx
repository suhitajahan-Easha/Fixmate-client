import { requireRole } from '@/lib/serverApi/server';
import React from 'react';


const AdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('customer');
    return children;
};

export default AdminDashboardLayout;