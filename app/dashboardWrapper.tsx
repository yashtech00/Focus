"use client";

import React from "react";

import Provider from "./providers";
import { DashboardSidebar } from "./components/dashboard/dashboardSideBar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            <DashboardSidebar />
            <main
                className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg`}
            >
                {/* <Navbar /> */}
                {children}
            </main>
        </div>
    );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (

        <Provider>
            <DashboardLayout>{children}</DashboardLayout>
        </Provider>

    );
};

export default DashboardWrapper;