"use client";

interface MediaPreviewProps {
  file: any;
  previewUrl: string;
}

export default function MediaPreview({ file, previewUrl }: MediaPreviewProps) {
  const ext = file.filename.split(".").pop()?.toLowerCase();

  if (!ext) return null;

  const baseStyles =
    "min-h-[70vh] min-w-[70vw] max-h-[95vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl border border-white/20";

  if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
    return (
      <div className="bg-black bg-opacity-30 rounded-2xl p-4 flex items-center justify-center">
        <img
          src={previewUrl}
          alt={file.filename}
          className={`${baseStyles} bg-transparent`}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
    );
  }

  if (["mp4", "webm"].includes(ext)) {
    return (
      <div className="bg-black bg-opacity-30 rounded-2xl p-4 flex items-center justify-center">
        <video
          src={previewUrl}
          controls
          className={`${baseStyles} bg-transparent`}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
    );
  }

  return null;
}
