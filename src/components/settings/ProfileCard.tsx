"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getProfile } from "@/services/auth";
import Loader from "@/components/ui/Loader";
import { motion } from "framer-motion";

export default function ProfileCard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (err: any) {
        setError(err.response?.data?.msg || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <motion.div
      className="rounded-2xl bg-black/50 shadow-lg backdrop-blur-xl border border-white/10 p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal information and avatar.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-700">
          {avatarPreview || user?.avatar ? (
            <img
              src={avatarPreview || user?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
              No Avatar
            </div>
          )}
        </div>
        <div>
          <label className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium cursor-pointer transition">
            Change
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {/* Username row */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-white font-medium">{user?.name || "—"}</p>
          </div>
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Edit
          </button>
        </div>

        {/* Email row */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium">{user?.email || "—"}</p>
          </div>
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Change
          </button>
        </div>

        {/* Password row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Password</p>
            <p className="text-white font-medium">••••••••</p>
          </div>
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Update
          </button>
        </div>
      </div>
    </motion.div>
  );
}
