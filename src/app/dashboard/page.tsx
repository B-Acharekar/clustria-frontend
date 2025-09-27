"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import ActionBar from "@/components/dashboard/actionbar";
import FileGrid from "@/components/dashboard/FileGrid";
import FilePreview from "@/components/dashboard/FilePreview";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ fallback to "" for root
  const currentFolderId =
    folderPath.length > 0 ? folderPath[folderPath.length - 1].id : "";
    console.log(currentFolderId)

  const handleOpenFolder = (id: string, name: string): void => {
    setFolderPath((prev) => [...prev, { id, name }]);
    setSearchTerm(""); // Clear search when navigating
  };

  const handleBacktrack = (index: number): void => {
    setFolderPath((prev) => prev.slice(0, index + 1));
    setSearchTerm(""); // Clear search when backtracking
  };

  const handleGoBack = (): void => {
    setFolderPath((prev) => prev.slice(0, prev.length - 1));
    setSearchTerm(""); // Clear search when going back
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Animate Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      {/* Animate InnerSidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <InnerSidebar collapsed={collapsed} />
      </motion.div>

      {/* Animate only the content */}
      <motion.main
        className="flex-1 flex flex-col overflow-hidden p-6"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      >
        <ActionBar
          currentFolderId={currentFolderId}
          refresh={() => {}} // ❌ no longer needed
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <motion.div
          className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {folderPath.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-4">All files</h2>

              <div className="flex items-center text-sm text-gray-300 mb-4 space-x-2">
                {/* Back button */}
                <button
                  onClick={handleGoBack}
                  className="flex items-center px-2 py-1 rounded hover:bg-white/10 transition"
                  aria-label="Go Back"
                >
                  <ArrowLeft size={16} />
                </button>

                {/* Folder breadcrumb path */}
                {folderPath.map((folder, index) => (
                  <span key={folder.id} className="flex items-center">
                    <span className="mx-1 text-gray-500 select-none">/</span>
                    <button
                      onClick={() => handleBacktrack(index)}
                      className="cursor-pointer hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                      aria-label={`Go to folder ${folder.name}`}
                    >
                      {folder.name}
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}

          {/* ✅ updated for new FileGrid */}
          <FileGrid
            folderId={currentFolderId}
            searchTerm={searchTerm}
            onOpenFolder={handleOpenFolder}
            onFileClick={setSelectedFile}
          />
        </motion.div>
      </motion.main>

      {selectedFile && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
        </motion.div>
      )}
    </div>
  );
}
