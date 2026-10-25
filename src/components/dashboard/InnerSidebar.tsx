"use client";
import { Folder as FolderIcon, X, ChevronDown, Clock, Star, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import StorageMeter from "./StorageMeter";
import * as folderService from "@/services/folder";
import Link from "next/link";

interface InnerSidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

interface FolderType {
  _id: string;
  name: string;
}

export default function InnerSidebar({ collapsed, onClose }: InnerSidebarProps) {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [foldersOpen, setFoldersOpen] = useState(true); // toggle for folder dropdown
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const { folders } = await folderService.getAllFoldersForSidebar();
        setFolders(folders);
        setFoldersLoading(false);

        const defaultNames = ["Documents", "Images", "Videos"];
        const existingNames = folders.map((f: FolderType) => f.name);
        const missingNames = defaultNames.filter((name) => !existingNames.includes(name));

        if (missingNames.length > 0) {
          await Promise.all(missingNames.map((name) => folderService.createFolder(name)));
          const updated = await folderService.getAllFoldersForSidebar();
          setFolders(updated.folders);
        }
      } catch (err) {
        setFoldersLoading(false);
        console.error("Failed to fetch or create default folders", err);
      }
    };
    fetchFolders();
  }, []);

  const handleOpenFolder = (id: string) => {
    router.push(`/folder?folder=${id}`);
    if (onClose) onClose();
  };

  const quickLinkClass = (href: string) => clsx(
    "flex items-center w-full px-3 py-2 rounded-lg transition text-left",
    pathname === href ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10"
  );

  return (
    <div
      className={clsx(
        "bg-[#111]/70 backdrop-blur-xl text-white h-screen flex flex-col transition-all duration-300 border-r border-white/10 shadow-lg",
        collapsed ? "w-0 overflow-hidden" : "w-64"
      )}
    >
      {!collapsed && (
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-gray-200 tracking-wide">Home</h2>
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

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 mt-2 space-y-2">

        {/* My Folders Dropdown */}
        <div>
          <button
            onClick={() => setFoldersOpen(!foldersOpen)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <span className="flex items-center">
              <FolderIcon className="w-4 h-4 text-blue-400 mr-2" />
              My Folders
            </span>
            <ChevronDown
              className={clsx("w-4 h-4 transition-transform", foldersOpen && "rotate-180")}
            />
          </button>
          {foldersOpen && (
            <div className="ml-6 mt-1 space-y-1">
              {foldersLoading && (
                <div className="space-y-2 px-3 py-2" aria-label="Loading folders">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-8 animate-pulse rounded-lg bg-white/5" />
                  ))}
                </div>
              )}
              {!foldersLoading && folders.length === 0 && (
                <p className="px-3 py-2 text-xs text-gray-500">No folders yet</p>
              )}
              {folders.map(folder => (
                <button
                  key={folder._id}
                  onClick={() => handleOpenFolder(folder._id)}
                  className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white/10 text-left text-sm transition"
                >
                  <FolderIcon className="w-4 h-4 text-blue-400 mr-2" />
                  {folder.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-3 space-y-1">
          <Link href={'/Recent'} className={quickLinkClass('/Recent')}>
            <Clock className="w-4 h-4 text-gray-400 mr-2" /> Recent
          </Link>
          <Link href={'/Starred'} className={quickLinkClass('/Starred')}>
            <Star className="w-4 h-4 text-yellow-400 mr-2" /> Starred
          </Link>
          <Link href={'/trash/'} className={quickLinkClass('/trash/')}>
            <Trash2 className="w-4 h-4 text-red-400 mr-2" /> Trash
          </Link>
        </div>
      </div>

      {/* Storage + Upgrade Plan */}
      <div className="px-4 py-4 border-t border-white/10">
        <StorageMeter />
        <button
          onClick={() => router.push("/plan")}
          className="mt-2 w-full text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg py-2 transition"
        >
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
