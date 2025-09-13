"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DocumentPreviewProps {
  file: { filename: string };
  previewUrl: string;
}

export default function DocumentPreview({ file, previewUrl }: DocumentPreviewProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const ext = file.filename.split(".").pop()?.toLowerCase();

  // Google Docs viewer URL
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    previewUrl
  )}&embedded=true`;

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
        // Other formats preview via Google Docs
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

  // Preview other formats via Google Docs
  return (
    <div className="flex flex-col w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm">
      <iframe
        src={googleViewerUrl}
        className="w-full h-full rounded-xl border border-white/20"
      />
      <a
        href={previewUrl.replace("preview=true", "")}
        download={file.filename}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500/70 to-blue-600/70 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-shadow shadow-md self-start"
      >
        Download File
      </a>
    </div>
  );
}
