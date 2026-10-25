"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  FileIcon,
  FileText,
  FileImage,
  FileVideo,
  MoreVertical,
  Star,
  StarOff,
} from "lucide-react";
import { File as FileType } from "./FileGrid";
import {
  deleteFile as deleteFileAPI,
  renameFile as renameFileAPI,
  shareFile as shareFileAPI,
  toggleStarFile,
} from "@/services/file";

type SortKey = "name" | "size" | "date";

interface FileListProps {
  files: FileType[];
  onFileClick?: (file: FileType) => void;
  toggleSort: (key: SortKey) => void;
  refreshFiles: () => void;
}

export default function FileList({
  files,
  onFileClick,
  toggleSort,
  refreshFiles,
}: FileListProps) {
  const [actionDropdown, setActionDropdown] = useState<string | null>(null);
  const [renameModal, setRenameModal] = useState<{
    open: boolean;
    file?: FileType;
    newName?: string;
  }>({ open: false });
  const [shareModal, setShareModal] = useState<{
    open: boolean;
    file?: FileType;
    email?: string;
  }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    file?: FileType;
  }>({ open: false });

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (!ext) return <FileIcon className="w-5 h-5 text-blue-400" />;
    if (ext === "pdf") return <FileText className="w-5 h-5 text-red-600" />;
    if (["doc", "docx", "txt"].includes(ext))
      return <FileText className="w-5 h-5 text-green-600" />;
    if (["png", "jpg", "jpeg", "gif"].includes(ext))
      return <FileImage className="w-5 h-5 text-pink-500" />;
    if (["mp4", "webm", "mov"].includes(ext))
      return <FileVideo className="w-5 h-5 text-purple-600" />;
    return <FileIcon className="w-5 h-5 text-blue-400" />;
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const handleRenameConfirm = async () => {
    if (!renameModal.file || !renameModal.newName) return;
    const oldExt = renameModal.file.filename.split(".").pop();
    const newExt = renameModal.newName.split(".").pop();
    if (oldExt !== newExt) {
      alert("Changing file extension is not allowed");
      return;
    }
    try {
      await renameFileAPI(renameModal.file._id, renameModal.newName);
      setRenameModal({ open: false });
      refreshFiles();
    } catch {
      alert("Failed to rename file");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.file) return;
    try {
      await deleteFileAPI(deleteModal.file._id);
      setDeleteModal({ open: false });
      refreshFiles();
    } catch {
      alert("Failed to delete file");
    }
  };

  const handleShareConfirm = async () => {
    if (!shareModal.file || !shareModal.email) return;
    try {
      await shareFileAPI(shareModal.file._id, shareModal.email);
      setShareModal({ open: false });
      alert("File shared successfully");
    } catch {
      alert("Failed to share file");
    }
  };

  return (
    <div className="flex min-h-0 flex-col h-full overflow-x-auto">
      {/* Table header */}
      <div className="sticky top-0 z-10 min-w-[560px] px-4 py-2 grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 text-xs font-semibold uppercase text-gray-300 bg-black/90 backdrop-blur-sm border-b border-white/20">
        <button
          onClick={() => toggleSort("name")}
          className="flex items-center gap-1 hover:text-white"
        >
          Name <ArrowUpDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => toggleSort("size")}
          className="flex items-center gap-1 hover:text-white"
        >
          Size <ArrowUpDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => toggleSort("date")}
          className="flex items-center gap-1 hover:text-white"
        >
          Modified <ArrowUpDown className="w-3 h-3" />
        </button>
        <span className="text-right">Actions</span>
      </div>

      {/* File list */}
      <div className="flex-1 min-w-[560px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-900 divide-y divide-white/10">
        {files.map((file) => (
          <div
            key={file._id}
            className="grid grid-cols-[2fr_1fr_1fr_3fr] gap-4 px-4 py-3 hover:bg-white/10 transition cursor-pointer rounded-lg items-center"
          >
            <div
              className="flex items-center gap-3"
              onClick={() => onFileClick?.(file)}
            >
              {getFileIcon(file.filename)}
              <span className="text-sm text-white truncate flex items-center gap-1">
                {file.filename}
                {file.starred && <Star className="w-4 h-4 text-yellow-400" />}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {formatSize(file.metadata?.size)}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(file.createdAt).toLocaleDateString()}
            </span>
            <div className="flex justify-end relative">
              <button
                onClick={() =>
                  setActionDropdown(
                    actionDropdown === file._id ? null : file._id
                  )
                }
                aria-label={`Actions for ${file.filename}`}
                className="p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>

              {actionDropdown === file._id && (
                <div className="absolute right-0 mt-1 w-32 bg-gray-800 rounded shadow-lg z-50 flex flex-col">
                  {/* Rename */}
                  <button
                    onClick={() => {
                      setRenameModal({ open: true, file });
                      setActionDropdown(null);
                    }}
                    className="px-4 py-2 text-left text-sm hover:bg-gray-700"
                  >
                    Rename
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setDeleteModal({ open: true, file });
                      setActionDropdown(null);
                    }}
                    className="px-4 py-2 text-left text-sm hover:bg-gray-700"
                  >
                    Delete
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => {
                      setShareModal({ open: true, file });
                      setActionDropdown(null);
                    }}
                    className="px-4 py-2 text-left text-sm hover:bg-gray-700"
                  >
                    Share
                  </button>

                  {/* Star/Unstar */}
                  <button
                    onClick={async () => {
                      try {
                        await toggleStarFile(file._id);
                        refreshFiles();
                      } catch {
                        alert("Failed to toggle star");
                      }
                      setActionDropdown(null);
                    }}
                    className="px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2"
                  >
                    {file.starred ? (
                      <>
                        <StarOff className="w-4 h-4 text-yellow-400" />
                        Unstar
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 text-yellow-400" />
                        Star
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rename Modal */}
      {renameModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80">
            <h3 className="text-white font-semibold mb-2">Rename File</h3>
            <input
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              value={renameModal.newName ?? renameModal.file?.filename}
              onChange={(e) =>
                setRenameModal((prev) => ({ ...prev, newName: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRenameModal({ open: false })}
                className="text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameConfirm}
                className="text-blue-400 font-semibold"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80">
            <h3 className="text-white font-semibold mb-2">Share File</h3>
            <input
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              placeholder="Enter email"
              value={shareModal.email ?? ""}
              onChange={(e) =>
                setShareModal((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShareModal({ open: false })}
                className="text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleShareConfirm}
                className="text-green-400 font-semibold"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80">
            <h3 className="text-white font-semibold mb-4">Delete File</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete &quot;{deleteModal.file?.filename}&quot;?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal({ open: false })}
                className="text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="text-red-400 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
