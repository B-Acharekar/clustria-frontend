// services/files.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/files`,
  withCredentials: true, // send cookies
});

// Normal upload
export const uploadFile = async (
  file: File,
  encryptionType = "NONE",
  folderId?: string,
  tags?: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("encryptionType", encryptionType);
  if (folderId) formData.append("folderId", folderId);
  if (tags) formData.append("tags", tags);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// AI upload (separate endpoint)
export const uploadFileAI = async (
  file: File,
  folderId?: string,
  tags?: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);
  if (tags) formData.append("tags", tags);

  const res = await api.post("/upload-ai", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// List user files
export const listFiles = async (folderId?: string) => {
  const res = await api.get("/", { params: { folderId } });
  return res.data;
};

// Download file
export const downloadFile = async (id: string) => {
  const res = await api.get(`/${id}/download`, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;

  const disposition = res.headers["content-disposition"];
  const match = disposition?.match(/filename="?(.+)"?/);
  link.download = match ? match[1] : "download";

  document.body.appendChild(link);
  link.click();
  link.remove();
};

// Delete file
export const deleteFile = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

// Storage info
export const getStorageInfo = async () => {
  const res = await api.get("/storage");
  return res.data;
};

export const shareFile = async (id: string, email: string) => {
  const res = await api.post(`/${id}/share`, { email });
  return res.data;
};

export const renameFile = async (id: string, newName: string) => {
  const res = await api.patch(`/${id}/rename`, { newName });
  return res.data;
};

// Get file details / preview
export const getFileById = async (id: string, preview = true) => {
  const res = await api.get(`/${id}`, { params: { preview } });
  return res.data;
};

// Toggle star/unstar a file
export const toggleStarFile = async (id: string) => {
  const res = await api.patch(`/${id}/star`);
  return res.data;
};

// Get all starred files
export const getStarredFiles = async () => {
  const res = await api.get("/starred");
  return res.data;
};

// Get recent files
export const getRecentFiles = async () => {
  const res = await api.get("/recent");
  return res.data;
};
