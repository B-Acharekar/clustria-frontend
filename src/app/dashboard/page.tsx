"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import ActionBar from "@/components/dashboard/actionbar";
import FileGrid from "@/components/dashboard/FileGrid";
import FilePreview from "@/components/dashboard/FilePreview";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const currentFolderId =
    folderPath.length > 0 ? folderPath[folderPath.length - 1].id : undefined;

  const handleOpenFolder = (id: string, name: string): void => {
    setFolderPath((prev) => [...prev, { id, name }]);
    setSearchTerm(""); // Clear search when navigating to a new folder
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
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <InnerSidebar collapsed={collapsed} />

      <main className="flex-1 flex flex-col overflow-hidden p-6">
        <ActionBar
          currentFolderId={currentFolderId}
          refresh={() => setRefreshKey((k) => k + 1)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 mt-6">
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

          <FileGrid
            key={refreshKey}
            folderId={currentFolderId}
            searchTerm={searchTerm}
            onOpenFolder={handleOpenFolder}
            onFileClick={setSelectedFile}
          />
        </div>
      </main>

      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl">
          <FilePreview file={selectedFile} onClose={() => setSelectedFile(null)} />
        </div>
      )}
    </div>
  );
}
