"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import ActionBar from "@/components/dashboard/actionbar";
import FileGrid from "@/components/dashboard/FileGrid";
import FilePreview from "@/components/dashboard/FilePreview";
import { motion } from "framer-motion";
import { getFolderPath } from "@/services/folder";

export default function FolderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialFolderId = searchParams.get("folder") || ""; // optional URL param
  const initialSearch = searchParams.get("q") || "";

  const [collapsed, setCollapsed] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(initialFolderId);
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh FileGrid
  const handleRefresh = () => setRefreshKey(prev => prev + 1);

const handleOpenFolder = (id: string, name: string) => {
  setCurrentFolder(id);
  setFolderPath(prev => [...prev, { id, name }]);
  router.replace(`/folder?folder=${id}`); // ✅ remove 3rd arg
};

const handleBacktrack = (index: number) => {
  const target = folderPath[index];
  if (!target) return;
  setCurrentFolder(target.id);
  setFolderPath(prev => prev.slice(0, index + 1));
  setSearchTerm("");
  router.replace(`/folder?folder=${target.id}`); // ✅ remove 3rd arg
};

const handleGoBack = () => {
  if (folderPath.length <= 1) {
    setFolderPath([]);
    setCurrentFolder("");
    router.replace(`/folder`); // ✅ remove 3rd arg
    return;
  }
  const prevFolder = folderPath[folderPath.length - 2];
  setFolderPath(prev => prev.slice(0, prev.length - 1));
  setCurrentFolder(prevFolder.id);
  router.replace(`/folder?folder=${prevFolder.id}`); // ✅ remove 3rd arg
};


  // Fetch folder path whenever currentFolder changes
  useEffect(() => {
    const fetchPath = async () => {
      if (!currentFolder) return setFolderPath([]);
      try {
        const data = await getFolderPath(currentFolder);
        setFolderPath(data);
      } catch (err) {
        console.error(err);
        setFolderPath([]);
      }
    };
    fetchPath();
  }, [currentFolder]);

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

      {/* Main content */}
      <motion.main
        className="flex-1 flex flex-col overflow-hidden p-6"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
      >
        <ActionBar
          currentFolderId={currentFolder}
          refresh={handleRefresh}
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

                {/* Breadcrumb */}
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

          {/* FileGrid */}
          <FileGrid
            key={refreshKey}
            folderId={currentFolder}
            searchTerm={searchTerm}
            onOpenFolder={handleOpenFolder}
            onFileClick={setSelectedFile}
          />
        </motion.div>
      </motion.main>

      {/* File Preview */}
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
