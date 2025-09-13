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