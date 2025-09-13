// src/services/api.ts
export interface APIFile {
  id: string;
  name: string;
  type: "file" | "folder";
  size: number;
  updatedAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export async function fetchFiles(path = "/") {
  const res = await fetch(`${API_BASE}/files?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error("Failed to fetch files");
  return (await res.json()) as APIFile[];
}
