import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

// axios instance with credentials
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const signup = async (name: string, email: string, password: string) => {
  const res = await api.post("/signup", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const googleLogin = async (token: string) => {
  const res = await api.post("/google", { token });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post("/reset-password", { token, password });
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfile = async (name?: string, avatar?: string) => {
  const res = await api.put("/profile", { name, avatar });
  return res.data;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const res = await api.put("/change-password", { oldPassword, newPassword });
  return res.data;
};