"use client";
import { useEffect, useState } from "react";
import { getFolder } from "@/services/folder";
import FolderList from "./FolderList";
import FileList from "./FileList";
import Loader from "../ui/Loader";

type SortKey = "name" | "size" | "date";
type SortOrder = "asc" | "desc";

interface File {
  _id: string;
  filename: string;
  createdAt: string;
  metadata?: { size?: number };
}

interface Folder {
  _id: string;
  name: string;
}

interface FileGridProps {
  folderId: string;
  onOpenFolder?: (id: string, name: string) => void;
  onFileClick?: (file: File) => void;
  searchTerm?: string;
}

export default function FileGrid({
  folderId,
  onOpenFolder,
  onFileClick,
  searchTerm = "",
}: FileGridProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");  
  const [loading, setLoading] = useState<boolean>(true); 


  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await getFolder(folderId);
        setFolders(data.folders || []);
        setFiles(data.files || []);
      } catch (err) {
        setFolders([]);
        setFiles([]);
      }finally {
        setLoading(false); // hide loader after fetch
      }
    })();
  }, [folderId]);

  const normalizedSearch = searchTerm.toLowerCase();
  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(normalizedSearch)
  );
  const filteredFiles = files.filter((f) =>
    f.filename.toLowerCase().includes(normalizedSearch)
  );

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
    <div className="space-y-6">
      <FolderList folders={filteredFolders} onOpenFolder={onOpenFolder} />
      <FileList
        files={sortedFiles}
        onFileClick={onFileClick}
        sortKey={sortKey}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
      />
      {filteredFolders.length === 0 && sortedFiles.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-10">
          No items in this folder
        </p>
      )}
    </div>
  );
}
