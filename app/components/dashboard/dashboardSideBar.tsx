
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut, Projector, Search, Home, icons, Badge } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bolt, ChevronDown, CopyPlus, Files, Layers2 } from "lucide-react";

export function DashboardSidebar() {
    // const links = [
    //     {
    //         label: "Home",
    //         href: "/pages/dashboard/home",
    //         icon: (
    //             <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Timeline",
    //         href: "#",
    //         icon: (
    //             <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Search",
    //         href: "#",
    //         icon: (
    //             <Search className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Users",
    //         href: "#",
    //         icon: (
    //             <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Team",
    //         href: "#",
    //         icon: (
    //             <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    //     {
    //         label: "Projects",
    //         href: "#",
    //         icon: (
    //             <Projector className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //         ),
    //     },
    // ];

    const  fetchProjects = async () => {
        try {
            
        } catch (e) {
            
        }
    }




    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-10xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >

            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">

                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            <Link href={"/pages/dashboard/home"}>
                                <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span>Home</span>
                            </Link>
                            <Link href={"/pages/dashboard/timeline"}>
                                <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span>Timeline</span>
                            </Link>
                            <Link href={"/pages/dashboard/search"}>
                                <Search className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span>Search</span>
                            </Link>
                            <Link href={"/pages/dashboard/users"}>
                                <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span>Users</span>
                            </Link>
                            <Link href={"/pages/dashboard/team"}>
                                <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span>Team</span>
                            </Link>
                            <Link href={"/pages/dashboard/projects"}>
                                <Projector className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />


                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <span>
                                            Projects
                                            <ChevronDown
                                                className="-me-1 ms-2 opacity-60"
                                                size={16}
                                                strokeWidth={2}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Badge size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                                            Copy
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </Link>
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src=""
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard />
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Focus
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">

                    {[...new Array(4)].map((i) => (
                        <div
                            key={"first-array" + i}
                            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((i) => (
                        <div
                            key={"second-array" + i}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
