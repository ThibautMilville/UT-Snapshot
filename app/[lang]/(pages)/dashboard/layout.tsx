"use client"

import { Sidebar } from "@/components/dashboard/sidebar";
import { RightSidebar } from "@/components/dashboard/right-sidebar";
import { SnapshotHistory } from "@/components/dashboard/snapshot/snapshot-history";
import { Navbar } from "@/components/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden mt-20">
        <div className="hidden lg:block w-[400px] min-w-[300px] h-full py-4 overflow-y-auto animate-in slide-in-from-left duration-1000">
          <Sidebar />
        </div>



        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-hidden animate-in slide-in-from-top duration-1000">
          <main className="flex-1 py-8 px-4 overflow-y-auto">
            {children}
          </main>
          <div className="lg:hidden flex-col gap-2">
            <Sidebar />
          </div>
          <div className="lg:hidden flex-col mt-4">
            <RightSidebar />
          </div>
        </div>

        <div className="hidden lg:block w-[400px] min-w-[300px] h-full p-4 overflow-y-auto animate-in slide-in-from-right duration-1000">
          <RightSidebar />
        </div>

      </div>

      <div className="px-4 animate-in slide-in-from-bottom duration-1000 delay-500">
        <SnapshotHistory />
      </div>

      <div className="animate-in slide-in-from-bottom duration-1000 delay-500">
        <Footer />
      </div>
    </div>
  );
}
