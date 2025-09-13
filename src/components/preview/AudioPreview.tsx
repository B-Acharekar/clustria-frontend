"use client";

import { motion } from "framer-motion";

interface AudioPreviewProps {
  file: any;
  previewUrl: string;
}

export default function AudioPreview({ file, previewUrl }: AudioPreviewProps) {
  const ext = file.filename.split(".").pop()?.toLowerCase();

  return (
    <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/10 rounded-xl p-6 text-center shadow-lg border border-white/20 max-w-[400px] w-full"
      >
        <h3 className="text-white font-semibold mb-4">Audio Preview</h3>
        <audio
          controls
          src={previewUrl}
          className="w-full bg-white/10 rounded-lg p-2"
        >
          Your browser does not support the audio element.
        </audio>
        <p className="text-gray-300 text-sm mt-4 truncate">{file.filename}</p>
      </motion.div>
    </div>
  );
}
