import { Home } from "lucide-react";
import { GraphHelpers } from "next/dist/compiled/webpack/webpack";
import Link from "next/link";

export function DashboardSidebar() {
   return (
      <div>
         <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start rtl:justify-end">
                     <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>

                     </button>
                     <a href="" className="flex ms-2 md:me-24">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Focus</span>
                     </a>
                  </div>

               </div>
            </div>
         </nav>

         <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
               <ul className="space-y-2 font-medium">
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <Home/>
                        <span className="ms-3">Home</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <GraphHelpers/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Timeline</span>
                        
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ms-3 whitespace-nowrap">Search</span>
                       
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                     </Link>
                  </li>
                  <li>
                     <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
                     </Link>
                  </li>
               </ul>
            </div>
         </aside>

         <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
               hello
            </div>
         </div>
      </div>
   )
}





