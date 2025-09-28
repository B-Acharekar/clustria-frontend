"use client";

import { useState } from "react";
import { Upload, Cpu, Cloud } from "lucide-react";
import { uploadFile, uploadFileAI } from "@/services/file";
import { motion, AnimatePresence } from "framer-motion";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  currentFolderId?: string;
  refresh: () => void;
}

export default function UploadModal({
  open,
  onClose,
  currentFolderId,
  refresh,
}: UploadModalProps) {
  const [aiCount, setAiCount] = useState(0);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isAI: boolean
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    if (isAI) {
      if (aiCount >= 5) {
        alert("You have reached the daily AI upload limit (5).");
        return;
      }
      await uploadFileAI(file, currentFolderId);
      setAiCount((prev) => prev + 1);
    } else {
      await uploadFile(file, "AES", currentFolderId);
    }
    await refresh();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-2xl z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full max-w-sm rounded-2xl overflow-hidden
                       border border-white/20 shadow-[0_8px_60px_rgba(0,0,0,0.7)]
                       bg-gradient-to-br from-white/10 via-white/5 to-white/2
                       backdrop-blur-2xl p-8"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Icon */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5
                              border border-white/20 shadow-inner 
                              shadow-[inset_0_2px_6px_rgba(255,255,255,0.3)]
                              hover:scale-105 transition-transform">
                <Upload className="w-11 h-11 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]" />
              </div>

              <h2 className="text-2xl font-semibold text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.3)]">
                Upload Files
              </h2>
              <p className="text-sm text-gray-300/80 max-w-xs leading-relaxed">
                Upload normal or AI files. AI uploads are limited to 5 per day.
              </p>

              {/* Upload Buttons */}
              <div className="flex flex-col gap-4 w-full">
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl
                                   bg-white/10 border border-white/20
                                   text-white cursor-pointer
                                   hover:bg-white/20 hover:shadow-lg
                                   transition-all duration-300">
                  <Cloud className="w-5 h-5" />
                  Normal Upload
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileSelect(e, false)}
                  />
                </label>

                <label className="flex items-center gap-3 px-4 py-3 rounded-xl
                                   bg-blue-600 border border-white/20
                                   text-white cursor-pointer
                                   hover:bg-blue-500 hover:shadow-lg
                                   transition-all duration-300">
                  <Cpu className="w-5 h-5" />
                  AI Upload ({aiCount}/5 today)
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileSelect(e, true)}
                  />
                </label>
              </div>

              {/* Cancel Button */}
              <button
                onClick={onClose}
                className="mt-4 w-full py-2.5 rounded-xl 
                           bg-red-500 border border-white/20
                           text-white font-medium hover:bg-red-600
                           hover:shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
