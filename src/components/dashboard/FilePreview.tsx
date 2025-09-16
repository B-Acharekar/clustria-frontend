"use client";

import { X, Download, FileText, Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import PdfPreview from "../preview/PdfPreview";
import ImagePreview from "../preview/ImagePreview";
import VideoPreview from "../preview/VideoPreview";
import AudioPreview from "../preview/AudioPreview";
import DocumentPreview from "../preview/DocumentPreview";
import ExcelPreview from "../preview/ExcelPreview";
import PPTPreview from "../preview/PPTPreview";
import CodePreview from "../preview/CodePreview";
import CompressedPreview from "../preview/CompressedPreview";
import FallbackPreview from "../preview/FallbackPreview";
import { fileService } from "@/services/fileService";
import { deleteFile } from "@/services/file";

interface FilePreviewProps {
  file: any | null;
  onClose: () => void;
}

export default function FilePreview({ file, onClose }: FilePreviewProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  if (!file) return null;

  const ext = file.filename.split(".").pop()?.toLowerCase();
  const previewUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/files/${file._id}/download?preview=true`;
  const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/files/${file._id}/download`;

const handleDelete = async () => {
  try {
    setDeleting(true);
    await deleteFile(file._id); // call the service
    setConfirmDelete(false);
    onClose();
    console.log("File deleted:", file._id);
  } catch (err) {
    console.error(err);
    alert("Failed to delete file");
  } finally {
    setDeleting(false);
  }
};


  const renderPreview = () => {
    if (!ext) return <FallbackPreview file={file} previewUrl={previewUrl} />;

    if (fileService.isPdf(ext)) return <PdfPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isImage(ext)) return <ImagePreview file={file} previewUrl={previewUrl} />;
    if (fileService.isVideo(ext)) return <VideoPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isAudio(ext)) return <AudioPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isExcel(ext)) return <ExcelPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isPPT(ext)) return <PPTPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isDocument(ext)) return <DocumentPreview file={file} previewUrl={previewUrl} />;
    if (fileService.isCode(ext)) return <CodePreview file={file} previewUrl={previewUrl} />;
    if (fileService.isCompressed(ext)) return <CompressedPreview file={file} previewUrl={previewUrl} />;

    return <FallbackPreview file={file} previewUrl={previewUrl} />;
  };

  return (
    <AnimatePresence>
      <motion.div
        key="preview-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-3xl"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full h-full flex flex-col rounded-3xl border border-white/20
                     bg-gradient-to-br from-white/15 via-white/5 to-white/10
                     shadow-[0_8px_50px_rgba(0,0,0,0.65)]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl shadow-lg">
            <h3 className="text-white font-semibold text-lg truncate max-w-[70%] flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-200/80" />
              {file.filename}
            </h3>

            <div className="flex items-center gap-3">
              <a
                href={downloadUrl}
                download={file.filename}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-slate-300/20 to-slate-200/10 text-slate-100 border border-white/20 hover:from-slate-200/40 hover:to-slate-100/30 hover:text-white transition-all duration-300 shadow-lg backdrop-blur-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </a>

              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
                           bg-gradient-to-r from-red-500/20 to-red-600/10
                           text-red-200 border border-red-400/30
                           hover:from-red-500/60 hover:to-red-600/50 hover:text-white
                           transition-all duration-300 shadow-lg backdrop-blur-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/10 backdrop-blur-lg
                           hover:bg-white/20 text-gray-300 hover:text-white
                           transition-all duration-300 shadow-lg border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* File Preview Area */}
          <div className="flex-1 flex items-center justify-center bg-white/10 backdrop-blur-xl p-0 overflow-hidden">
            {renderPreview()}
          </div>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <motion.div
          key="delete-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 shadow-2xl text-center w-[380px]"
          >
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-white text-lg font-semibold mb-2">Delete this file?</h2>
            <p className="text-gray-300/80 text-sm mb-6">
              This action cannot be undone. The file will be permanently deleted.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500/70 to-red-600/70 text-white font-medium border border-red-400/30 hover:from-red-500 hover:to-red-600 transition shadow-lg"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
