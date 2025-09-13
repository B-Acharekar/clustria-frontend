"use client";

import { getFolder } from "@/services/folder";
import { FileIcon, FolderIcon, FileText, FileVideo, FileImage } from "lucide-react";
import { useEffect, useState } from "react";

interface FileGridProps {
  folderId?: string;
  onOpenFolder?: (id: string, name: string) => void;
  onFileClick?: (file: any) => void;
  searchTerm?: string; // Optional search term for filtering
}

export default function FileGrid({
  folderId,
  onOpenFolder,
  onFileClick,
  searchTerm = "",
}: FileGridProps) {
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFolder(folderId);
        setFolders(data.folders || []);
        setFiles(data.files || []);
      } catch (error) {
        console.error("Failed to fetch folder data:", error);
        setFolders([]);
        setFiles([]);
      }
    })();
  }, [folderId]);

  // Normalize search term to lowercase for case-insensitive filtering
  const normalizedSearchTerm = searchTerm.toLowerCase();

  // Filter folders and files based on search term
  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(normalizedSearchTerm)
  );

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(normalizedSearchTerm)
  );

  // Function to return the correct icon based on file extension
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();

    if (!ext) return <FileIcon className="w-10 h-10 text-blue-400" />;

    if (ext === "pdf") {
      return <FileText className="w-10 h-10 text-red-600" />;
    }

    if (["doc", "docx", "txt"].includes(ext)) {
      return <FileText className="w-10 h-10 text-green-600" />;
    }

    if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
      return <FileImage className="w-10 h-10 text-pink-500" />;
    }

    if (["mp4", "webm", "mov"].includes(ext)) {
      return <FileVideo className="w-10 h-10 text-purple-600" />;
    }

    return <FileIcon className="w-10 h-10 text-blue-400" />;
  };

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Render filtered folders */}
      {filteredFolders.map((folder) => (
        <div
          key={folder._id}
          onClick={() => onOpenFolder?.(folder._id, folder.name)}
          className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <FolderIcon className="w-10 h-10 text-yellow-400" />
            <p className="mt-3 text-sm font-medium text-white truncate w-full text-center">
              {folder.name}
            </p>
          </div>
        </div>
      ))}

      {/* Render filtered files */}
      {filteredFiles.map((file) => (
        <div
          key={file._id}
          onClick={() => onFileClick?.(file)}
          className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center">
            {getFileIcon(file.filename)}
            <p className="mt-3 text-sm font-medium text-white truncate w-full text-center">
              {file.filename}
            </p>
            {file.size && <p className="text-xs text-gray-400">{file.size}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
