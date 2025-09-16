"use client";

import { motion } from "framer-motion";

interface ZipPreviewProps {
  file: { filename: string };
  previewUrl: string;
}

export default function ZipPreview({ file, previewUrl }: ZipPreviewProps) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/10 rounded-xl p-6 text-center shadow-lg border border-white/20 max-w-[300px]"
      >
        <h3 className="text-white font-semibold mb-2">ZIP Archive</h3>
        <p className="text-gray-300 text-sm mb-4">
          This is a compressed ZIP file. You can download it to view its contents.
        </p>
        <a
          href={previewUrl.replace("preview=true", "")}
          download={file.filename}
          className="px-4 py-2 bg-gradient-to-r from-blue-500/70 to-blue-600/70 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-shadow shadow-md"
        >
          Download ZIP
        </a>
      </motion.div>
    </div>
  );
}
