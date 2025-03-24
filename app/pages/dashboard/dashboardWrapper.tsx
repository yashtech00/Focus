"use client";

import React, { useEffect, useState } from "react";

import { DashboardSidebar } from "../../components/dashboard/dashboardSideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Local state for managing dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference on initial load
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Store dark mode preference in localStorage when it changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <DashboardSidebar />
      
        {children}
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
   
      <DashboardLayout>{children}</DashboardLayout>
   
  );
};

export default DashboardWrapper;
