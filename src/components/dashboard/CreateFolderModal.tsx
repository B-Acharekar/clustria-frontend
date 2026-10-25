"use client";

import { useEffect, useState } from "react";
import { FolderPlus, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void | Promise<void>;
}

export default function CreateModal({ open, onClose, onCreate }: CreateModalProps) {
  const [folderName, setFolderName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !creating) onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose, creating]);

  const handleCreate = async () => {
    if (!folderName.trim()) return;
    setCreating(true);
    try {
      await onCreate(folderName.trim());
      setFolderName("");
      onClose();
    } finally {
      setCreating(false);
    }
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
                       bg-gradient-to-br from-white/20 via-white/10 to-white/5 
                       backdrop-blur-2xl p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-folder-dialog-title"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Icon with glow */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 
                              border border-white/20 shadow-inner 
                              shadow-[inset_0_2px_6px_rgba(255,255,255,0.3)]
                              hover:scale-105 transition-transform">
                <FolderPlus className="w-11 h-11 text-slate-100 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]" />
              </div>

              <h2 id="create-folder-dialog-title" className="text-2xl font-semibold text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.3)]">
                Create New Folder
              </h2>
              <p className="text-sm text-gray-300/80 max-w-xs leading-relaxed">
                Give your new folder a unique name.  
                Keep it clear, sleek, and organized.
              </p>

              {/* Input */}
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
                onKeyDown={(event) => {
                  if (event.key === "Enter") void handleCreate();
                }}
                disabled={creating}
                className="w-full px-4 py-3 rounded-xl 
                           bg-white/10 backdrop-blur-lg 
                           border border-white/30 
                           text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-white/40
                           focus:border-white/50
                           shadow-inner transition-all duration-300"
              />

              {/* Actions */}
              <div className="flex gap-4 w-full mt-4">
                <button
                  onClick={onClose}
                  disabled={creating}
                  className="flex-1 py-2.5 rounded-xl 
                             bg-white/10 border border-white/20 
                             text-gray-300 font-medium 
                             hover:bg-white/20 hover:text-white
                             hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]
                             transition-all duration-300 backdrop-blur-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => void handleCreate()}
                  disabled={!folderName.trim() || creating}
                  className="flex-1 py-2.5 rounded-xl font-semibold 
                             bg-gradient-to-r from-slate-300/60 to-slate-100/20 
                             text-white border border-white/30
                             shadow-lg shadow-[0_0_25px_rgba(255,255,255,0.15)]
                             hover:from-slate-200/80 hover:to-slate-100/40
                             hover:border-white/50
                             hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]
                             transition-all duration-300 backdrop-blur-lg"
                >
                  {creating ? <><LoaderCircle className="mr-2 inline h-4 w-4 animate-spin" /> Creating...</> : "Create"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
