"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Loader2,
  RotateCcw,
  MoreVertical,
  Grid,
  List,
  Eye,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import FilePreview from "@/components/dashboard/FilePreview";
import { useToast } from "@/components/ui/Toast";
import * as trashService from "@/services/trash";
import Loader from "@/components/ui/Loader";

interface TrashItem {
  _id: string;
  name: string;
  type: "file" | "folder";
  deletedAt: string;
  size?: string;
  metadata?: any;
}

export default function TrashPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { toast } = useToast();

  const [collapsed, setCollapsed] = useState(false);
  const [item, setItem] = useState<TrashItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const fetchItem = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await trashService.getTrashItem(id as string);
      setItem(data);
    } catch {
      toast("Error: Failed to load trash item.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleRestore = async () => {
    if (!item) return;
    setActionLoading(true);
    try {
      await trashService.restoreItem(item._id);
      toast("Restored successfully");
      router.push("/trash");
    } catch {
      toast("Failed to restore item", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    setActionLoading(true);
    try {
      await trashService.permanentlyDeleteItem(item._id);
      toast("Deleted permanently");
      router.push("/trash");
    } catch {
      toast("Failed to delete item", "error");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        Item not found in trash.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/trash")}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-1" /> Back
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestore}
              disabled={actionLoading}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" /> Restore
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            <button className="p-2 hover:bg-white/10 rounded-md">
              <MoreVertical className="w-4 h-4 text-gray-300" />
            </button>
            <button
              onClick={() =>
                setViewMode(viewMode === "list" ? "grid" : "list")
              }
              className="p-2 hover:bg-white/10 rounded-md"
            >
              {viewMode === "list" ? (
                <Grid className="w-4 h-4" />
              ) : (
                <List className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {viewMode === "list" ? (
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="text-gray-400 border-b border-white/20">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Deleted At</th>
                  <th className="text-left py-2">Size</th>
                  <th className="text-left py-2">Preview</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/10 transition">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">
                    {new Date(item.deletedAt).toLocaleString()}
                  </td>
                  <td className="py-2">{item.size || "-"}</td>
                  <td className="py-2">
                    {item.type === "file" && (
                      <button
                        onClick={() => setPreviewOpen(true)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                onClick={() => item.type === "file" && setPreviewOpen(true)}
                className="cursor-pointer border border-white/20 rounded-lg bg-black/30 p-4 hover:shadow-lg transition"
              >
                <div className="h-24 bg-white/5 flex items-center justify-center rounded mb-2">
                  {item.type === "file" ? (
                    <Eye className="w-6 h-6 text-gray-300" />
                  ) : (
                    <Trash2 className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-400">
                  Deleted: {new Date(item.deletedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Preview */}
      {previewOpen && item.type === "file" && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FilePreview
            file={item.metadata || item}
            onClose={() => setPreviewOpen(false)}
          />
        </motion.div>
      )}
    </div>
  );
}
