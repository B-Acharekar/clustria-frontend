"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Loader from "@/components/ui/Loader";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { getProfile, updateProfile, changePassword as changePasswordAPI } from "@/services/auth";
import OuterSidebar from "@/components/dashboard/Sidebar";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    // Editable fields
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [outerCollapsed, setOuterCollapsed] = useState(false);
    const [innerVisible, setInnerVisible] = useState(false);
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const data = await getProfile();
                setUser(data.user);
                setName(data.user.name);
                setAvatar(data.user.avatar || "");
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
            setAvatarFile(e.target.files[0]);
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setMsg("");
        setError("");
        try {
        const uploadedAvatar = avatar;
        // Optional: upload to server/cloudinary here
        const data = await updateProfile(name, uploadedAvatar);
            setUser(data.user);
            setEditing(false);
            setMsg("Profile updated successfully");
        } catch (err: any) {
            setError(err.response?.data?.msg || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setLoading(true);
        setMsg("");
        setError("");
        try {
            const data = await changePasswordAPI(oldPassword, newPassword);
            setMsg(data.msg);
            setOldPassword("");
            setNewPassword("");
        } catch (err: any) {
            setError(err.response?.data?.msg || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
            {/* Sidebar placeholder */}
            <OuterSidebar
                collapsed={outerCollapsed}
                setCollapsed={setOuterCollapsed}
                onHomeClick={() => setInnerVisible(true)}
            />

            <div className="flex-1 p-8">
                <div className="max-w-3xl mx-auto bg-black rounded-2xl shadow p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <TypingAnimation className="text-3xl font-extrabold">
                            Profile
                        </TypingAnimation>
                        <InteractiveHoverButton
                            type="button"
                            onClick={() => setEditing(!editing)}
                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
                        >
                            {editing ? "Cancel" : "Edit Profile"}
                        </InteractiveHoverButton>
                    </div>

                    {msg && <p className="text-green-600">{msg}</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Avatar
                                </div>
                            )}
                        </div>

                        {editing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="text-sm text-gray-500 mt-2"
                            />
                        )}

                        <div className="flex-1 space-y-3">
                            <div>
                                <p className="text-gray-500 text-sm">Name</p>
                                {editing ? (
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-lg font-semibold">{user?.name}</p>
                                )}
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Email</p>
                                <p className="text-lg font-semibold">{user?.email}</p>
                            </div>

                            {editing && (
                                <InteractiveHoverButton
                                    type="button"
                                    onClick={handleUpdateProfile}
                                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 mt-2"
                                >
                                    Save Changes
                                </InteractiveHoverButton>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                        <TypingAnimation className="text-2xl font-bold">Change Password</TypingAnimation>
                        <div className="space-y-3 max-w-md">
                            <input
                                type="password"
                                placeholder="Old password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <InteractiveHoverButton
                                type="button"
                                onClick={handleChangePassword}
                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Change Password
                            </InteractiveHoverButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
