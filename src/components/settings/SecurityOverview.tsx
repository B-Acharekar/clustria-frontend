"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { getSecurityOverview } from "@/services/security";

interface SecurityInfo {
  storageUsed: number;
  storageLimit: number;
  encryptionCoverage: string;
  lastLogin: string;
  safe: boolean;
}

export default function SecurityOverview() {
  const [info, setInfo] = useState<SecurityInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSecurity = async () => {
      setLoading(true);
      try {
        const data = await getSecurityOverview();
        if (data.success) setInfo(data);
        else setError("Failed to load security info");
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSecurity();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <Loader />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!info) return null;

  const storageGBUsed = (info.storageUsed / 1024 / 1024 / 1024).toFixed(2);
  const storageGBTotal = (info.storageLimit / 1024 / 1024 / 1024).toFixed(0);

  return (
    <div className="rounded-2xl bg-black/50 shadow-lg backdrop-blur-xl border border-white/10 p-6 space-y-4">
      <h2 className="text-xl font-semibold">Security</h2>

      <div className="space-y-2 text-gray-300">
        <p>
          <span className="font-medium text-gray-400">Data Protection:</span>{" "}
          {info.encryptionCoverage}
        </p>
        <p>
          <span className="font-medium text-gray-400">Storage:</span>{" "}
          {storageGBUsed} GB / {storageGBTotal} GB
        </p>
        <p>
          <span className="font-medium text-gray-400">Last Login:</span>{" "}
          {info.lastLogin}
        </p>
      </div>

      <div
        className={`flex items-center gap-2 p-3 rounded-lg ${
          info.safe
            ? "bg-green-600/20 text-green-400"
            : "bg-yellow-600/20 text-yellow-400"
        }`}
      >
        {info.safe ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertTriangle className="w-5 h-5" />
        )}
        <span className="font-medium">
          {info.safe
            ? "All your files are protected"
            : "Some files are not encrypted"}
        </span>
      </div>

      <button className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition">
        Change Password
      </button>
    </div>
  );
}
