"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getFolder } from "@/services/folder";
import FolderList from "./FolderList";
import FileList from "./FileList";
import { File as FileIcon, FolderOpen } from "lucide-react";

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
    } catch {
      setFolders([]);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  // Normalized search
  const { filteredFolders, sortedFiles } = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const nextFolders = folders.filter((f) =>
      f.name.toLowerCase().includes(normalizedSearch)
    );
    const nextFiles = files.filter((f) =>
      f.filename.toLowerCase().includes(normalizedSearch)
    );

    const nextSortedFiles = [...nextFiles].sort((a, b) => {
      let valA: string | number;
      let valB: string | number;
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

    return { filteredFolders: nextFolders, sortedFiles: nextSortedFiles };
  }, [files, folders, searchTerm, sortKey, sortOrder]);

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
      <div className="flex flex-col gap-4 animate-pulse" aria-label="Loading files">
        <div className="h-5 w-24 rounded bg-white/10" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 w-28 shrink-0 rounded-xl bg-white/5" />
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-12 rounded-lg bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Folders */}
      <div className="px-1 sm:px-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Folders</h2>
          <span className="text-xs text-gray-500">
            {filteredFolders.length} {filteredFolders.length === 1 ? "folder" : "folders"}
          </span>
        </div>
        <div className="py-2">
          <FolderList
            folders={filteredFolders}
            onOpenFolder={onOpenFolder}
            refresh={fetchData}
          />
        </div>
      </div>

      {/* Files */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="mb-2 flex items-center justify-between px-1 sm:px-4">
          <h2 className="text-lg font-bold text-white">Files</h2>
          <span className="text-xs text-gray-500">
            {sortedFiles.length} {sortedFiles.length === 1 ? "file" : "files"}
          </span>
        </div>
        <FileList
          files={sortedFiles}
          onFileClick={onFileClick}
          toggleSort={toggleSort}
          refreshFiles={fetchData}
        />

        {filteredFolders.length === 0 && sortedFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            {searchTerm ? (
              <FileIcon className="h-8 w-8 text-gray-500" />
            ) : (
              <FolderOpen className="h-8 w-8 text-gray-500" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-300">
                {searchTerm ? "No matching items" : "This folder is empty"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {searchTerm ? "Try a different search term." : "Upload a file or create a folder to get started."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
