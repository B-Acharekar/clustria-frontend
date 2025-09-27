"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadFile, uploadFileAI } from "@/services/file";

interface UploadModalProps {
    open: boolean;
    onClose: () => void;
    currentFolderId?: string;
    refresh: () => void;
}

export default function UploadModal({
    open,
    onClose,
    currentFolderId,
    refresh,
}: UploadModalProps) {
    const [aiCount, setAiCount] = useState(0);

    if (!open) return null;

    const handleFileSelect = async (
        e: React.ChangeEvent<HTMLInputElement>,
        isAI: boolean
    ) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];

        if (isAI) {
            if (aiCount >= 5) {
                alert(" You have reached the daily AI upload limit (5).");
                return;
            }
            await uploadFileAI(file, currentFolderId); // ✅ use AI endpoint
            setAiCount((prev) => prev + 1);
        } else {
            await uploadFile(file, "AES", currentFolderId); // ✅ normal endpoint
        }
        refresh();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-zinc-900 rounded-2xl shadow-xl p-6 w-96 border border-white/10">
                <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                    <Upload size={18} /> Upload Options
                </h2>

                <div className="flex flex-col gap-4">
                    {/* Normal Upload */}
                    <label className="flex items-center justify-between px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer">
                        Normal Upload
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileSelect(e, false)}
                        />
                    </label>

                    {/* AI Upload */}
                    <label className="flex items-center justify-between px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
                        AI Upload ({aiCount}/5 today)
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileSelect(e, true)}
                        />
                    </label>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
