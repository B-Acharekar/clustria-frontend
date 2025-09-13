"use client";

import { fileService } from "@/services/fileService";

interface MediaPreviewProps {
  file: any;
  previewUrl: string;
}

export default function MediaPreview({ file, previewUrl }: MediaPreviewProps) {
  const ext = file.filename.split(".").pop()?.toLowerCase();
  if (!ext) return null;

  const baseStyles =
    "min-h-[70vh] min-w-[70vw] max-h-[95vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl border border-white/20";

  if (fileService.isImage(ext)) {
    return (
      <div className="bg-black bg-opacity-30 rounded-2xl p-4 flex items-center justify-center">
        <img
          src={previewUrl}
          alt={file.filename}
          className={`${baseStyles}`}
        />
      </div>
    );
  }

  if (fileService.isAudioVideo(ext)) {
    return (
      <div className="bg-black bg-opacity-30 rounded-2xl p-4 flex items-center justify-center">
        <video
          src={previewUrl}
          controls
          className={`${baseStyles}`}
        />
      </div>
    );
  }

  return null;
}
