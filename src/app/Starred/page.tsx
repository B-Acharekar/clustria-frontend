"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import FilePreview from "@/components/dashboard/FilePreview";
import { getStarredFiles, toggleStarFile } from "@/services/file";
import { MoreVertical } from "lucide-react";

// Format bytes dynamically
const formatSize = (bytes?: number) => {
  if (!bytes) return "-";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(1)} ${units[i]}`;
};

export default function StarredPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [actionDropdown, setActionDropdown] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Trigger refresh
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  // Fetch starred files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getStarredFiles();
        setFiles(res.files || []);
      } catch (err) {
        console.error("Failed to fetch starred files:", err);
      }
    };
    fetchFiles();
  }, [refreshTrigger]);

  const handleToggleStar = async (fileId: string) => {
    try {
      await toggleStarFile(fileId);
      triggerRefresh();
    } catch (err) {
      console.error("Failed to toggle star:", err);
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
      <motion.main className="flex-1 p-6 overflow-y-auto">
        {files.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            No starred files yet
          </div>
        )}

        {files.length > 0 && (
          <div className="flex flex-col divide-y divide-white/10">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 px-4 py-2 text-xs font-semibold uppercase text-gray-300 bg-black/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
              <span>Name</span>
              <span>Size</span>
              <span>Modified</span>
              <span className="text-right">Actions</span>
            </div>

            {files.map((file, index) => (
              <div
                key={file.id || file._id || index}
                className="grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 px-4 py-3 hover:bg-white/10 transition cursor-pointer items-center rounded-lg"
              >
                <div className="truncate" onClick={() => setSelectedFile(file)}>
                  {file.name || file.filename}
                </div>
                <div className="text-xs text-gray-400">{formatSize(file.size || file.metadata?.size)}</div>
                <div className="text-xs text-gray-400">{new Date(file.createdAt).toLocaleDateString()}</div>
                <div className="flex justify-end relative">
                  <button
                    onClick={() => setActionDropdown(actionDropdown === file._id ? null : file._id)}
                    className="p-1 rounded hover:bg-white/10"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>

                  {actionDropdown === file._id && (
                    <div className="absolute right-0 mt-1 w-32 bg-gray-800 rounded shadow-lg z-50 flex flex-col">
                      <button
                        onClick={() => {
                          handleToggleStar(file._id);
                          setActionDropdown(null);
                        }}
                        className="px-4 py-2 text-left text-sm hover:bg-gray-700"
                      >
                        Unstar
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setActionDropdown(null);
                        }}
                        className="px-4 py-2 text-left text-sm hover:bg-gray-700"
                      >
                        Preview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
            <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
