"use client";

import { motion } from "framer-motion";

interface VideoPreviewProps {
  file: any;
  previewUrl: string;
}

export default function VideoPreview({ file, previewUrl }: VideoPreviewProps) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black/40 p-6 rounded-3xl backdrop-blur-md">
      <motion.video
        src={previewUrl}
        controls
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="max-w-full max-h-full rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/20"
      />
    </div>
  );
}
