// services/files.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/files`,
  withCredentials: true, // send cookie automatically
});

// Upload file
export const uploadFile = async (file: File, encryptionType = "NONE", folderId?: string,tags?: string) => {
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

// List user files
export const listFiles = async (folderId?: string) => {
  const res = await api.get("/", { params: { folderId } });
  return res.data;
};

// Download file
export const downloadFile = async (id: string) => {
  const res = await api.get(`/${id}/download`, {
    responseType: "blob", // get file as binary
  });

  // trigger download in browser
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;

  // Try to preserve filename if Content-Disposition is set
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

// Get storage info
export const getStorageInfo = async () => {
  const res = await api.get("/storage");
  return res.data;
};
