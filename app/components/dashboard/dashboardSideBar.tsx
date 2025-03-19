"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect, createContext, useContext } from "react";
import { Menu, X, Home, UserCog, Search, LogOut, Projector, ChevronDown } from "lucide-react";
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "Home", href: "/pages/dashboard/home", icon: <Home /> },
  { label: "Timeline", href: "/pages/dashboard/timeline", icon: <UserCog /> },
  { label: "Search", href: "/pages/dashboard/search", icon: <Search /> },
  { label: "Users", href: "/pages/dashboard/users", icon: <LogOut /> },
  { label: "Team", href: "/pages/dashboard/team", icon: <LogOut /> },
];

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export const SidebarBody = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex h-full", className)} {...props}>
      <DesktopSidebar>{children}</DesktopSidebar>
    </div>
  );
};

const DesktopSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/project");
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className={cn("h-full px-4 pr-20 py-4 flex flex-col bg-neutral-100 dark:bg-neutral-800", className)} {...props}>
      <button className="mb-4 p-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map(({ label, href, icon }) => (
            <SidebarLink key={label} link={{ label, href, icon }} />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Projector className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                <span className="flex items-center gap-1">Projects <ChevronDown size={16} className="opacity-60 flex items-center" /></span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {projects.map(({ id, title }) => (
                <DropdownMenuItem key={id}>{title}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      )}
    </div>
  );
};

export const SidebarLink = ({ link, className, ...props }: { link: { label: string; href: string; icon: React.ReactNode }; className?: string }) => {
  return (
      <Link href={link.href} className={cn("flex items-center justify-start gap-2 py-2", className)} {...props}>
          
      {link.icon}
      <span className="text-neutral-700 dark:text-neutral-200 text-sm">{link.label}</span>
    </Link>
  );
};

export const DashboardSidebar = () => {
  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-10xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <DesktopSidebar />
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
};

const Dashboard = () => (
  <div className="flex flex-1 p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-col gap-2 w-full h-full">
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
      ))}
    </div>
    <div className="flex gap-2 flex-1">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
      ))}
    </div>
  </div>
);
