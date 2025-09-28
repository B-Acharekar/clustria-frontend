"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import { getFileById } from "@/services/file"; // note correct import
import { ArrowDown } from "lucide-react";

export default function FilePage() {
  const params = useParams();
  const fileId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId) return;

    const fetchFile = async () => {
      setLoading(true);
      setError(null);
      try {
        // preview=true just fetches metadata, not full blob
        const res = await getFileById(fileId, true);
        if (!res || !res.file) {
          setError("File not found or unavailable");
          setFile(null);
          return;
        }
        setFile(res.file);
      } catch (err: any) {
        console.error("Failed to fetch file:", err);
        setError(err?.response?.data?.error || "Failed to fetch file");
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  // Download handler
  const handleDownload = async () => {
    if (!file?.filename) return;

    try {
      // Download file via service (resolves blob)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/${file._id}/download`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <InnerSidebar collapsed={collapsed} />
      </motion.div>

      {/* Main content */}
      <motion.main className="flex-1 p-6 flex flex-col justify-center items-center text-center">
        {loading ? (
          <p className="text-gray-400">Loading file...</p>
        ) : error ? (
          <p className="text-gray-400">{error}</p>
        ) : (
          <motion.div
            className="bg-white/10 rounded-xl p-8 w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-xl font-bold mb-4">{file.filename}</h1>
            <p className="text-gray-300 mb-6">
            File type: {file.metadata?.type || "unknown"} | Size:{" "}
            {file.metadata?.size ? (file.metadata.size / 1024).toFixed(2) + " KB" : "unknown"}
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              <ArrowDown className="w-4 h-4" />
              Download
            </button>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
