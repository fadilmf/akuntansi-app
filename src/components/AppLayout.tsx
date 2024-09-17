"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./navigation/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 w-full">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? "lg:ml-[300px]" : "lg:ml-0"
        } mt-24`}
      >
        {children}
      </div>
    </div>
  );
}
