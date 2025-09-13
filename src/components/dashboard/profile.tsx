"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 transition-all duration-200"
      >
        p
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <button
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
