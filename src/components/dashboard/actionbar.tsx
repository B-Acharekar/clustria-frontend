"use client";

import { Search, Upload, Plus, LogOut, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "@/services/auth";
import { createFolder } from "@/services/folder";
import CreateModal from "./CreateFolderModal";
import UploadModal from "./UploadModal";

interface ActionBarProps {
  currentFolderId?: string;
  currentFolderName?: string;
  refresh: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function ActionBar({
  currentFolderId,
  currentFolderName,
  refresh,
  searchTerm,
  setSearchTerm,
}: ActionBarProps) {
  const [open, setOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const data = await getProfile();
              setAvatar(data.user.avatar || "");
          } catch (err: any) {
              console.log(err.response?.data?.msg || "Failed to fetch profile");
          }
      };
      fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleCreateFolder = async (name: string) => {
    await createFolder(name, currentFolderId);
    refresh();
    setCreateModalOpen(false);
  };

  return (
    <div className="relative mb-4 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Bar */}
        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            placeholder={currentFolderName ? `Search in ${currentFolderName}...` : "Search files..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search files"
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 pl-11 pr-11 text-sm placeholder-gray-400 text-white shadow-md backdrop-blur-md focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/30 transition"
          />
          <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3 top-3 rounded-md p-0.5 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          >
            <Upload size={18} />
            Upload
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition"
          >
            <Plus size={18} />
            Create
          </button>
        </div>

        {/* Profile Button */}
        <div className="relative shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open account menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40
              border border-white/10 backdrop-blur-lg text-white font-semibold shadow-lg
              hover:border-white/25 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" className="h-11 w-11 rounded-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-14 z-20 w-44 overflow-hidden rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl">
              <button
                onClick={() => router.push("/profile")}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <UploadModal
      open={uploadModalOpen}
      onClose={() => setUploadModalOpen(false)}
      currentFolderId={currentFolderId}
      refresh={refresh}
    />
    
      {/* Create Modal */}
      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}
