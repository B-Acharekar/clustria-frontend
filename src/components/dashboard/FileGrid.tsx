"use client";

import { useEffect, useState, useCallback } from "react";
import { getFolder } from "@/services/folder";
import FolderList from "./FolderList";
import FileList from "./FileList";
import Loader from "../ui/Loader";

type SortKey = "name" | "size" | "date";
type SortOrder = "asc" | "desc";

export interface File {
  _id: string;
  filename: string;
  createdAt: string;
  metadata?: { size?: number };
  starred?: boolean; // ⭐ new field
}

export interface Folder {
  _id: string;
  name: string;
}

interface FileGridProps {
  folderId: string;
  onOpenFolder?: (id: string, name: string) => void;
  onFileClick?: (file: File) => void;
  searchTerm?: string;
  refreshTrigger?: number; // optional number to force refresh
}

export default function FileGrid({
  folderId,
  onOpenFolder,
  onFileClick,
  searchTerm = "",
  refreshTrigger = 0,
}: FileGridProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch folder & files
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFolder(folderId);
      setFolders(data.folders || []);
      setFiles(data.files || []);
    } catch (err) {
      setFolders([]);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger, searchTerm]);

  // Normalized search
  const normalizedSearch = searchTerm.toLowerCase();
  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(normalizedSearch)
  );
  const filteredFiles = files.filter((f) =>
    f.filename.toLowerCase().includes(normalizedSearch)
  );

  // Sorting files
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let valA: any, valB: any;
    switch (sortKey) {
      case "size":
        valA = a.metadata?.size || 0;
        valB = b.metadata?.size || 0;
        break;
      case "date":
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
        break;
      default:
        valA = a.filename.toLowerCase();
        valB = b.filename.toLowerCase();
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Folders */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-white mb-2">Folders</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 py-2">
          <FolderList
            folders={filteredFolders}
            onOpenFolder={onOpenFolder}
            refresh={fetchData}
          />
        </div>
      </div>

      {/* Files */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <FileList
          files={sortedFiles}
          onFileClick={onFileClick}
          sortKey={sortKey}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          refreshFiles={fetchData}
        />

        {filteredFolders.length === 0 && sortedFiles.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-10">
            No items in this folder
          </p>
        )}
      </div>
    </div>
  );
}
