"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ImagePreviewProps {
  file: any;
  previewUrl: string;
}

export default function ImagePreview({ file, previewUrl }: ImagePreviewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-30 p-6 rounded-2xl">
      <motion.img
        src={previewUrl}
        alt={file.filename}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onLoad={() => setLoaded(true)}
        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300 ease-in-out"
      />
    </div>
  );
}
