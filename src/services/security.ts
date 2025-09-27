import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/security",
  withCredentials: true, // send cookies automatically for auth
});

// Get security overview
export const getSecurityOverview = async () => {
  const res = await api.get("/overview");
  return res.data; // should contain { success, lastLogin, storageUsed, storageLimit, encryptionCoverage, safe }
};
