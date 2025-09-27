"use client";

import { Search, Upload, Plus, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "@/services/auth";
import { uploadFile } from "@/services/file";
import { createFolder } from "@/services/folder";
import CreateModal from "./CreateFolderModal";
import axios from "axios";
import UploadModal from "./UploadModal";

interface ActionBarProps {
  currentFolderId?: string;
  refresh: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function ActionBar({
  currentFolderId,
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    await uploadFile(file, "AES", currentFolderId);
    refresh();
  };

  const handleCreateFolder = async (name: string) => {
    await createFolder(name, currentFolderId);
    refresh();
    setCreateModalOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-4 mb-6">
      {/* 🔎 Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 pl-11 text-sm placeholder-gray-400 text-white shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      </div>


    {/* Action Buttons */}
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => setUploadModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white text-black hover:bg-zinc-200 shadow-sm hover:shadow-md"
      >
        <Upload size={18} />
        Upload
      </button>

      <button
        onClick={() => setCreateModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white shadow-sm hover:shadow-md"
      >
        <Plus size={18} />
        Create
      </button>
    </div>

      {/* Profile Button */}
      <div className="absolute right-0 top-0">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-11 h-11 rounded-full 
              bg-black/40 border border-white/10 backdrop-blur-lg 
              text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
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
