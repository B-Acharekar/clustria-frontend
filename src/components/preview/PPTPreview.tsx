"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PPTPreviewProps {
  file: { filename: string };
  previewUrl: string;
}

export default function PPTPreview({ file, previewUrl }: PPTPreviewProps) {
  const [loading, setLoading] = useState(true);
  const ext = file.filename.split(".").pop()?.toLowerCase();

  // Google Slides viewer
  const googleSlidesUrl = `https://docs.google.com/presentation/d/${encodeURIComponent(
    previewUrl
  )}/preview`;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/40 rounded-2xl backdrop-blur-md">
        <p className="text-white">Loading preview...</p>
      </div>
    );
  }

  // Preview PPT/PPTX via Google Slides
  if (ext === "ppt" || ext === "pptx") {
    return (
      <div className="flex flex-col w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(
            previewUrl
          )}&embedded=true`}
          className="w-full h-full rounded-xl border border-white/20"
        />
        <a
          href={previewUrl.replace("preview=true", "")}
          download={file.filename}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-red-500/70 to-red-600/70 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-shadow shadow-md self-start"
        >
          Download File
        </a>
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/10 rounded-xl p-6 text-center shadow-lg border border-white/20 max-w-[300px]"
      >
        <h3 className="text-white font-semibold mb-2">Unsupported file</h3>
        <p className="text-gray-300 text-sm mb-4">Cannot preview this file type.</p>
        <a
          href={previewUrl.replace("preview=true", "")}
          download={file.filename}
          className="px-4 py-2 bg-gradient-to-r from-gray-500/70 to-gray-600/70 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-shadow shadow-md"
        >
          Download File
        </a>
      </motion.div>
    </div>
  );
}
