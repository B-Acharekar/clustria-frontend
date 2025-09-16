"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CodePreviewProps {
  file: any;
  previewUrl: string;
}

export default function CodePreview({ file, previewUrl }: CodePreviewProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await fetch(previewUrl);
        const text = await res.text();
        setContent(text);
      } catch (error) {
        console.error("Failed to load code file", error);
        setContent("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [previewUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/40 rounded-2xl backdrop-blur-md">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm overflow-auto">
      <motion.pre
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[90%] bg-white/10 rounded-xl p-4 text-sm text-white whitespace-pre-wrap break-words shadow-lg border border-white/20 font-mono"
      >
        {content}
      </motion.pre>
    </div>
  );
}
