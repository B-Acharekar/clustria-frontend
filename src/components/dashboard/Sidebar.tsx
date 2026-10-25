import {
  Home,
  Folder,
  PanelRightClose,
  PanelRightOpen,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function OuterSidebar({
  collapsed,
  setCollapsed,
  currentFolderId = "", 
  onHomeClick,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  currentFolderId?: string; 
  onHomeClick?: () => void;
}) {
  return (
    <div
      className={clsx(
        "bg-[#111]/90 backdrop-blur-md text-white h-screen flex flex-col items-center py-4 border-r border-white/10 transition-all duration-300",
        "w-16"
      )}
    >
      <div className="mb-10 w-full flex items-center justify-center">
        <Link href={'/dashboard'} className="text-sm font-bold tracking-wide text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer">
          Clustria
        </Link>
      </div>

      {/* Home */}
      <Link
        href={"/dashboard"}
        onClick={onHomeClick}
        aria-label="Go to dashboard"
        title="Home"
        className="group flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-[#222] transition-all w-full"
      >
        <Home className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
        <span className="text-[10px] text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
          Home
        </span>
      </Link>

      <Link 
        href={currentFolderId ? `/folder/${currentFolderId}` : "/folder"}
        aria-label="Open folders"
        title="Folders"
        className="group flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-[#222] transition-all w-full"
      >
        <Folder className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
        <span className="text-[10px] text-gray-400 group-hover:text-yellow-400 transition-colors duration-200">
          Folders
        </span>
      </Link>

      <Link
        href="/settings"
        aria-label="Open settings"
        title="Settings"
        className="group flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-[#222] transition-all w-full"
        >
          <Settings className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-200" />
          <span className="text-[10px] text-gray-400 group-hover:text-yellow-400 transition-colors duration-200">
            Settings
          </span>
      </Link>

      <div className="flex-1" />

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Show navigation" : "Hide navigation"}
        title={collapsed ? "Show navigation" : "Hide navigation"}
        className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-[#222] transition w-full"
      >
        {collapsed ? (
          <PanelRightOpen className="w-5 h-5 text-gray-400 hover:text-white transition" />
        ) : (
          <PanelRightClose className="w-5 h-5 text-gray-400 hover:text-white transition" />
        )}
      </button>
    </div>
  );
}
