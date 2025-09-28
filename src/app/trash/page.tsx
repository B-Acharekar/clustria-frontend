"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Folder, File, Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import * as trashService from "@/services/trash";
import { useToast } from "@/components/ui/Toast";
import { motion } from "framer-motion";
import Loader from "@/components/ui/Loader";

interface TrashItem {
  _id: string;
  name: string;
  type: "file" | "folder";
  deletedAt: string;
}

export default function TrashOverviewPage() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await trashService.getAllTrash();
      setItems(data);
    } catch {
      toast("Failed to fetch trash items.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

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

      {/* Inner Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <InnerSidebar collapsed={collapsed} />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6 rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center">
            <Trash2 className="w-5 h-5 text-red-400 mr-2" />
            <h1 className="text-xl font-bold">Trash</h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await trashService.emptyTrash();
                  toast("Trash emptied successfully");
                  fetchItems();
                } catch {
                  toast("Failed to empty trash.", "error");
                } finally {
                  setLoading(false);
                }
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Empty Trash
            </button>
          )}
        </motion.div>

        {/* Trash Items */}
        {items.length === 0 ? (
          <p className="text-gray-400 mt-6">Your trash is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                onClick={() => router.push(`/trash/${item._id}`)}
                className="flex items-center w-full px-4 py-3 rounded-lg bg-[#111]/70 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                {item.type === "folder" ? (
                  <Folder className="w-5 h-5 text-blue-400 mr-3" />
                ) : (
                  <File className="w-5 h-5 text-green-400 mr-3" />
                )}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-gray-500">
                    Deleted: {new Date(item.deletedAt).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
