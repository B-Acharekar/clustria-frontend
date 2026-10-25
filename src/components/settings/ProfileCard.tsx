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
      className="rounded-xl border border-white/10 bg-[#161b22] p-6 space-y-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal information and avatar.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center space-x-6">
        <div className="h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-white/10">
          {avatarPreview || user?.avatar ? (
            <img
              src={avatarPreview || user?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              No Avatar
            </div>
          )}
        </div>
        <div>
          <label className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.06] px-4 py-1.5 text-sm font-medium transition hover:bg-white/10">
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
