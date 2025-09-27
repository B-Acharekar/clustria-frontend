// services/folders.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/folders`,
  withCredentials: true,
});

export const createFolder = async (name: string, parentId?: string) => {
  const res = await api.post("/", { name, parentId });
  return res.data;
};

export const getFolder = async (id?: string) => {
  const url = id ? `/${id}` : "/";
  const res = await api.get(url);
  return res.data; // { folders, files }
};

export const getAllFoldersForSidebar = async (id?: string) => {
  const url = "/";
  const res = await api.get(url);
  return res.data; // { folders, files }
};

export const getFolderPath = async (id: string) => {
  const res = await api.get(`/path/${id}`);
  return res.data; // [{id, name}, ..., current folder]
};

export const renameFolder = async (id: string, name: string) => {
  const res = await api.put(`/${id}`, { name });
  return res.data;
};

export const deleteFolder = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
