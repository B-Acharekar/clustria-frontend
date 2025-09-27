import { ArrowUpDown, FileIcon, FileText, FileImage, FileVideo } from "lucide-react";

type SortKey = "name" | "size" | "date";
type SortOrder = "asc" | "desc";

interface FileListProps {
  files: any[];
  onFileClick?: (file: any) => void;
  sortKey: SortKey;
  sortOrder: SortOrder;
  toggleSort: (key: SortKey) => void;
}

export default function FileList({
  files,
  onFileClick,
  sortKey,
  sortOrder,
  toggleSort,
}: FileListProps) {
  if (files.length === 0) return null;

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (!ext) return <FileIcon className="w-5 h-5 text-blue-400" />;
    if (ext === "pdf") return <FileText className="w-5 h-5 text-red-600" />;
    if (["doc", "docx", "txt"].includes(ext)) return <FileText className="w-5 h-5 text-green-600" />;
    if (["png", "jpg", "jpeg", "gif"].includes(ext)) return <FileImage className="w-5 h-5 text-pink-500" />;
    if (["mp4", "webm", "mov"].includes(ext)) return <FileVideo className="w-5 h-5 text-purple-600" />;
    return <FileIcon className="w-5 h-5 text-blue-400" />;
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-2">Files</h3>
      {/* Header row */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 text-xs font-semibold uppercase text-gray-400 border-b border-white/10">
        <button onClick={() => toggleSort("name")} className="flex items-center space-x-1 hover:text-white">
          <span>Name</span><ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => toggleSort("size")} className="flex items-center space-x-1 hover:text-white">
          <span>Size</span><ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => toggleSort("date")} className="flex items-center space-x-1 hover:text-white">
          <span>Modified</span><ArrowUpDown className="w-3 h-3" />
        </button>
      </div>

      {/* File rows */}
      <div className="divide-y divide-white/10 rounded-xl overflow-hidden bg-white/5">
        {files.map((file) => (
          <div
            key={file._id}
            onClick={() => onFileClick?.(file)}
            className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-3 hover:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {getFileIcon(file.filename)}
              <span className="text-sm text-white truncate">{file.filename}</span>
            </div>
            <span className="text-xs text-gray-400">{formatSize(file.metadata?.size)}</span>
            <span className="text-xs text-gray-400">{new Date(file.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
