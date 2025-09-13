"use client";

import { useState } from "react";
import OuterSidebar from "./Sidebar";
import InnerSidebar from "./InnerSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [outerCollapsed, setOuterCollapsed] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);

  return (
    <div className="flex h-screen">
      <OuterSidebar
        collapsed={outerCollapsed}
        setCollapsed={setOuterCollapsed}
        onHomeClick={() => setInnerVisible(true)}
      />
      <InnerSidebar collapsed={!innerVisible} />
      <main className="flex-1 bg-gray-950 text-white">{children}</main>
    </div>
  );
}
