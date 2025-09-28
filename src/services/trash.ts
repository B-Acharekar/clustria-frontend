import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/trash`,
  withCredentials: true,
});

export const getAllTrash = async () => {
  const res = await api.get("/");
  return res.data; // array of trash items
};

export const getTrashItem = async (id: string) => {
  const res = await api.get(`/${id}`);
  return res.data; // single trash item
};

export const restoreItem = async (id: string) => {
  const res = await api.post(`/${id}/restore`);
  return res.data;
};

export const permanentlyDeleteItem = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const emptyTrash = async () => {
  const res = await api.delete("/");
  return res.data;
};
