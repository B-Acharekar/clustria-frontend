"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import FilePreview from "@/components/dashboard/FilePreview";
import { getRecentFiles } from "@/services/file";
import { ArrowUpDown, Calendar, HardDrive } from "lucide-react";

export default function RecentPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [sortKey, setSortKey] = useState<"name" | "date" | "size">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Trigger refresh
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);
    
  const formatSize = (bytes?: number) => {
    if (!bytes) return "-";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
        size = size / 1024;
        i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  };

  // Fetch recent files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getRecentFiles();
        setFiles(res.files || []);
      } catch (err) {
        console.error("Failed to fetch recent files:", err);
      }
    };
    fetchFiles();
  }, [refreshTrigger]);

  // Sorting
  const sortedFiles = [...files].sort((a, b) => {
    let valA: any, valB: any;
    switch (sortKey) {
      case "name":
        valA = a.filename?.toLowerCase() || "";
        valB = b.filename?.toLowerCase() || "";
        break;
      case "size":
        valA = a.metadata?.size || 0;
        valB = b.metadata?.size || 0;
        break;
      default:
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: "name" | "date" | "size") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <InnerSidebar collapsed={collapsed} />
      </motion.div>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Files</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleSort("name")}
              className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20 flex items-center gap-1"
            >
              <ArrowUpDown size={14} /> Name
            </button>
            <button
              onClick={() => toggleSort("date")}
              className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20 flex items-center gap-1"
            >
              <Calendar size={14} /> Date
            </button>
            <button
              onClick={() => toggleSort("size")}
              className="px-3 py-1 text-sm rounded bg-white/10 hover:bg-white/20 flex items-center gap-1"
            >
              <HardDrive size={14} /> Size
            </button>
          </div>
        </div>

        {/* File List */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-3 sm:grid-cols-5 text-sm font-medium bg-white/10 px-4 py-2">
            <div>Name</div>
            <div className="hidden sm:block">Uploaded</div>
            <div className="hidden sm:block">Size</div>
            <div className="col-span-2">Actions</div>
          </div>

          {sortedFiles.length === 0 && (
            <div className="text-gray-400 text-center py-10">
              No recent files found
            </div>
          )}

          {sortedFiles.map((file, index) => (
            <motion.div
              key={file._id || index}
              className="grid grid-cols-3 sm:grid-cols-5 items-center px-4 py-3 border-t border-white/5 hover:bg-white/10 cursor-pointer"
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedFile(file)}
            >
              <div className="truncate">{file.filename || "Untitled"}</div>
              <div className="hidden sm:block text-gray-400 text-sm">
                {new Date(file.createdAt).toLocaleDateString()}
              </div>
              <div className="hidden sm:block text-gray-400 text-sm">
                {formatSize(file.metadata?.size)}
              </div>
              <div className="col-span-2 text-right text-gray-400 text-sm">
                Click to preview
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* File Preview Modal */}
      {selectedFile && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setSelectedFile(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl"
          >
            <FilePreview
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
