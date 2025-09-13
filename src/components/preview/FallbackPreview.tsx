"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DocumentPreviewProps {
  file: any;
  previewUrl: string;
}

export default function DocumentPreview({ file, previewUrl }: DocumentPreviewProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const ext = file.filename.split(".").pop()?.toLowerCase();

  useEffect(() => {
    const fetchContent = async () => {
      if (ext === "txt") {
        try {
          setLoading(true);
          const res = await fetch(previewUrl);
          const text = await res.text();
          setContent(text);
        } catch (error) {
          console.error("Error loading document", error);
          setContent("Failed to load document.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchContent();
  }, [ext, previewUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/40 rounded-2xl backdrop-blur-md">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (ext === "txt") {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm overflow-auto">
        <motion.pre
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[90%] bg-white/10 rounded-xl p-4 text-sm text-white whitespace-pre-wrap break-words shadow-lg border border-white/20"
        >
          {content}
        </motion.pre>
      </div>
    );
  }

  // Animated fallback for unsupported formats
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 rounded-xl p-6 text-center shadow-lg border border-white/20 max-w-[350px] animate-bounce"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          ❌
        </motion.div>
        <h3 className="text-white font-semibold mb-2">Oops!</h3>
        <p className="text-gray-300 text-sm mb-4">
          Preview not supported for this file type.
        </p>
        <a
          href={previewUrl.replace("preview=true", "")}
          download={file.filename}
          className="px-4 py-2 bg-gradient-to-r from-red-500/70 to-red-600/70 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-shadow shadow-md"
        >
          Download File
        </a>
      </motion.div>
    </div>
  );
}
