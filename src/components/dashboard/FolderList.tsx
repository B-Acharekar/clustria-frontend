import { FolderIcon, Trash2, Edit3, MoreHorizontal } from "lucide-react";
import { deleteFolder, renameFolder } from "@/services/folder";
import { useState } from "react";

interface FolderListProps {
  folders: any[];
  onOpenFolder?: (id: string, name: string) => void;
  refresh: () => void; 
}

export default function FolderList({ folders: initialFolders, onOpenFolder, refresh }: FolderListProps) {
  const [folders, setFolders] = useState(initialFolders);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const handleDelete = async (folderId: string) => {
    const confirmed = confirm("Are you sure you want to delete this folder and all its contents?");
    if (!confirmed) return;

    try {
      await deleteFolder(folderId);
      setFolders(folders.filter((f) => f._id !== folderId));
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete folder");
    }
  };

  const handleRename = async (folderId: string) => {
    if (!newName.trim()) {
      alert("Folder name cannot be empty");
      return;
    }

    try {
      const updated = await renameFolder(folderId, newName);
      setFolders(folders.map((f) => (f._id === folderId ? { ...f, name: updated.name } : f)));
      setEditingFolderId(null);
      setNewName("");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to rename folder");
    }
  };

  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-900 py-2">
      {folders.map((folder) => (
        <div
          key={folder._id}
          className="flex-shrink-0 flex flex-col items-center p-4 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-xl min-w-[120px] relative transition"
        >
          {/* Folder click */}
          <div
            onClick={() => onOpenFolder?.(folder._id, folder.name)}
            className="flex flex-col items-center cursor-pointer"
          >
            <FolderIcon className="w-10 h-10 text-yellow-400" />
            <p className="mt-2 text-sm font-medium text-white truncate text-center w-full">
              {folder.name}
            </p>
          </div>

          {/* Three dots menu */}
          <button
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenFor(menuOpenFor === folder._id ? null : folder._id);
            }}
          >
            <MoreHorizontal className="w-5 h-5 text-gray-300" />
          </button>

          {/* Dropdown menu */}
          {menuOpenFor === folder._id && (
            <div className="absolute top-10 right-2 flex flex-col gap-2 bg-gray-800 rounded-lg shadow-xl text-white text-sm py-2 px-3 z-10 w-32">
              <button
                className="flex items-center gap-2 py-1 px-2 hover:bg-indigo-600 hover:text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFolderId(folder._id);
                  setNewName(folder.name);
                  setMenuOpenFor(null);
                }}
              >
                <Edit3 className="w-4 h-4" /> Rename
              </button>
              <button
                className="flex items-center gap-2 py-1 px-2 hover:bg-red-600 hover:text-white rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(folder._id);
                  setMenuOpenFor(null);
                }}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}

          {/* Inline rename */}
          {editingFolderId === folder._id && (
            <div className="absolute top-2 left-2 flex gap-2 bg-gray-900 p-2 rounded z-10">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename(folder._id);
                }}
                className="p-1 text-sm rounded border w-28 bg-gray-700 text-white"
                autoFocus
              />
              <button onClick={() => handleRename(folder._id)} className="text-green-500 font-bold">
                ✓
              </button>
              <button onClick={() => setEditingFolderId(null)} className="text-red-500 font-bold">
                ✕
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
