"use client";

import {
  Folder,
  ChevronRight,
  Image as ImageIcon,
  Share2,
  Inbox,
  Trash2,
  Star,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import StorageMeter from "./StorageMeter"; //

export default function InnerSidebar({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose?: () => void;
}) {
  const [allFilesOpen, setAllFilesOpen] = useState(false);
  const [starredOpen, setStarredOpen] = useState(true);
  const [untitledOpen, setUntitledOpen] = useState(true);

  return (
    <div
      className={clsx(
        "bg-[#111]/70 backdrop-blur-xl text-white h-screen flex flex-col transition-all duration-300 border-r border-white/10 shadow-lg",
        collapsed ? "w-0 overflow-hidden" : "w-64"
      )}
    >
      {!collapsed && (
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-gray-200 tracking-wide">
            Home
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          )}
        </div>
      )}

      {/*  Scroll hidden but still works */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Main navigation */}
        <nav className="flex flex-col space-y-1 px-2 mt-2">
          {/*  Wrap button + submenu together */}
          <div
            className="group relative"
            onMouseEnter={() => setAllFilesOpen(true)}
            onMouseLeave={() => setAllFilesOpen(false)}
          >
            <button
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 w-full"
            >
              <span className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-300" />
                <span>All files</span>
              </span>
              <ChevronRight
                className={clsx(
                  "w-4 h-4 text-gray-400 transition-transform",
                  allFilesOpen && "rotate-90"
                )}
              />
            </button>

            {/* Submenu */}
            <div
              className={clsx(
                "flex flex-col ml-6 overflow-hidden transition-all duration-300 ease-in-out",
                allFilesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200"
              >
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span>Photos</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200"
              >
                <Share2 className="w-4 h-4 text-green-400" />
                <span>Shared</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200"
              >
                <Inbox className="w-4 h-4 text-purple-400" />
                <span>File requests</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>Deleted files</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Quick Access Section */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Quick Access
            </h3>
            <button className="p-1 rounded-lg hover:bg-white/10 transition">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Starred */}
          <div>
            <button
              onClick={() => setStarredOpen(!starredOpen)}
              className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-white/10 transition group"
            >
              <ChevronRight
                className={clsx(
                  "w-4 h-4 text-gray-400 transition-transform group-hover:text-yellow-400",
                  starredOpen && "rotate-90"
                )}
              />
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="group-hover:text-yellow-300">Starred</span>
            </button>
            {starredOpen && (
              <div className="ml-6 text-xs text-gray-400 py-1 italic">
                No starred items yet
              </div>
            )}
          </div>

          {/* Untitled */}
          <div className="mt-2">
            <button
              onClick={() => setUntitledOpen(!untitledOpen)}
              className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-white/10 transition group"
            >
              <ChevronRight
                className={clsx(
                  "w-4 h-4 text-gray-400 transition-transform group-hover:text-blue-400",
                  untitledOpen && "rotate-90"
                )}
              />
              <Folder className="w-4 h-4 text-blue-400" />
              <span className="group-hover:text-blue-300">Untitled</span>
            </button>
            {untitledOpen && (
              <div className="ml-6 text-xs text-gray-400 py-1 italic">
                Drag important items here
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  Storage Meter integrated here */}
      <div className="px-4 py-4 border-t border-white/10">
        <StorageMeter />
      </div>
    </div>
  );
}
