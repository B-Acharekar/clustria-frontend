"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/components/ui/Toast";
import TrashComponentMain from "@/components/trash/TrashComponentMain";
import TrashOverviewMain from "@/components/trash/TrashOverviewMain";
import Loader from "@/components/ui/Loader";
import * as trashService from "@/services/trash";

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
  const id = params.id;
  const idStr = Array.isArray(id) ? id[0] : id;

  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [item, setItem] = useState<TrashItem | null>(null);
  const [loading, setLoading] = useState(true);

const fetchedRef = useRef(false);

useEffect(() => {
  if (fetchedRef.current) return; // already fetched
  fetchedRef.current = true;

  if (!idStr) {
    setLoading(false);
    return;
  }

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await trashService.getTrashItem(idStr);
      setItem(data || null);
    } catch {
      toast("Failed to fetch item", "error");
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  fetchItem();
}, [idStr, toast]);


  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <Loader />
        </div>
      ) : idStr && item ? (
        <TrashComponentMain item={item} setItem={setItem} />
      ) : (
        <TrashOverviewMain />
      )}
    </div>
  );
}
