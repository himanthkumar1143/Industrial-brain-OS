import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../contexts/SidebarContext";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Navbar } from "./Navbar";

/**
 * DashboardLayout – Permanent enterprise application framework for Industrial Brain OS.
 * Mounts all future sprint modules via React Router Outlet with zero layout shifts.
 */
export const DashboardLayout: React.FC = React.memo(() => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-primary/30 selection:text-primary-foreground">
        {/* Left Navigation Panels */}
        <Sidebar />
        <MobileSidebar />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-y-auto min-w-0 focus:outline-none" role="main">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
});

DashboardLayout.displayName = "DashboardLayout";
