"use client";

import React from "react";
import Provider from "./providers";
import { DashboardSidebar } from "./components/dashboard/dashboardSideBar";
import { NavBar } from "./pages/Navbar/Nav";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            
            <DashboardSidebar />
                {children}
            
        </div>
    );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (

        <Provider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </Provider>

    );
};

export default DashboardWrapper;