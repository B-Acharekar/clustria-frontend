// components/dashboard/FileCard.tsx
import { File, Folder } from "lucide-react";

interface FileCardProps {
  name: string;
  size: string;
  type: "file" | "folder";
}

export default function FileCard({ name, size, type }: FileCardProps) {
  return (
    <div className="w-48 h-28 bg-black/30 backdrop-blur-xl rounded-xl shadow-lg hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer">
      {type === "file" ? (
        <File className="w-8 h-8 text-blue-400 mb-2" />
      ) : (
        <Folder className="w-8 h-8 text-yellow-400 mb-2" />
      )}
      <p className="text-sm font-medium text-white">{name}</p>
      <p className="text-xs text-white/50">{size}</p>
    </div>
  );
}
