// services/payment.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
  withCredentials: true,
});

export const initiatePayment = async (payload: { plan: string; method: string }) => {
  const res = await api.post("/initiate", payload);
  return res.data;
};

export const confirmPayment = async (payload: { paymentId: string; simulatedResult: "success" | "failure"; plan: string }) => {
  const res = await api.post("/confirm", payload);
  return res.data;
};
