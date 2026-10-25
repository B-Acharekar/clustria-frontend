"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import ActionBar from "@/components/dashboard/actionbar";
import FileGrid from "@/components/dashboard/FileGrid";
import FilePreview from "@/components/dashboard/FilePreview";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const currentFolderId =
    folderPath.length > 0 ? folderPath[folderPath.length - 1].id : "";
  const currentFolderName =
    folderPath.length > 0 ? folderPath[folderPath.length - 1].name : "Your workspace";

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  const handleOpenFolder = (id: string, name: string) => {
    setFolderPath(prev => [...prev, { id, name }]);
    setSearchTerm("");
  };

  const handleBacktrack = (index: number) => {
    const target = folderPath[index];
    if (!target) return;
    setFolderPath(prev => prev.slice(0, index + 1));
    setSearchTerm("");
  };

  const handleGoBack = () => {
    if (folderPath.length <= 1) {
      setFolderPath([]);
      setSearchTerm("");
      return;
    }
    setFolderPath(prev => prev.slice(0, prev.length - 1));
  };

  return (
    <div className="flex h-screen min-w-0 overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      <motion.div
        className="hidden shrink-0 sm:block"
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

      <motion.main className="min-w-0 flex-1 flex flex-col overflow-hidden p-3 sm:p-6">
        <ActionBar
          currentFolderId={currentFolderId}
          currentFolderName={currentFolderName}
          refresh={triggerRefresh}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <motion.div
          className="min-h-0 flex-1 flex flex-col rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-3 sm:p-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Breadcrumb */}
          {folderPath.length > 0 && (
            <div className="flex items-center text-sm text-gray-300 mb-4 space-x-2">
              <button
                onClick={handleGoBack}
                className="flex items-center px-2 py-1 rounded hover:bg-white/10 transition"
                aria-label="Go Back"
              >
                <ArrowLeft size={16} />
              </button>

              {folderPath.map((folder, index) => (
                <span key={folder.id} className="flex items-center">
                  <span className="mx-1 text-gray-500 select-none">/</span>
                  <button
                    onClick={() => handleBacktrack(index)}
                    className="cursor-pointer hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                  >
                    {folder.name}
                  </button>
                </span>
              ))}
            </div>
          )}

          <FileGrid
            folderId={currentFolderId}
            searchTerm={searchTerm}
            onOpenFolder={handleOpenFolder}
            onFileClick={setSelectedFile}
            refreshTrigger={refreshTrigger}
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
