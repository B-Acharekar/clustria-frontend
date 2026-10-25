"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, HardDrive, LockKeyhole, Mail } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { getProfile, updateProfile, changePassword as changePasswordAPI } from "@/services/auth";
import { getStorageInfo } from "@/services/file";
import OuterSidebar from "@/components/dashboard/Sidebar";

const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const formatBytes = (bytes: number) => {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

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
    const [storage, setStorage] = useState<any>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [outerCollapsed, setOuterCollapsed] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const [profileResult, storageResult] = await Promise.allSettled([
                    getProfile(),
                    getStorageInfo(),
                ]);
                if (profileResult.status === "rejected") throw profileResult.reason;
                const data = profileResult.value;
                setUser(data.user);
                setName(data.user.name);
                setAvatar(data.user.avatar || "");
                if (storageResult.status === "fulfilled" && storageResult.value.success) {
                    setStorage(storageResult.value);
                }
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
            const file = e.target.files[0];
            if (!file.type.startsWith("image/")) {
                setError("Please choose an image file.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError("Avatar images must be smaller than 2 MB.");
                return;
            }
            setError("");
            setAvatarFile(file);
            setAvatar(URL.createObjectURL(file));
            setEditing(true);
        }
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setMsg("");
        setError("");
        try {
        const uploadedAvatar = avatarFile ? await fileToDataUrl(avatarFile) : avatar;
        const data = await updateProfile(name, uploadedAvatar);
            setUser(data.user);
            setAvatar(data.user.avatar || "");
            setAvatarFile(null);
            setEditing(false);
            setMsg("Profile updated successfully");
        } catch (err: any) {
            setError(err.response?.data?.msg || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }
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
        <div className="flex h-screen items-center justify-center bg-[#0d1117]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#0d1117] text-white">
            <aside className="sticky top-0 h-screen shrink-0">
                <OuterSidebar
                    collapsed={outerCollapsed}
                    setCollapsed={setOuterCollapsed}
                />
            </aside>

            <main className="h-screen min-w-0 flex-1 overflow-y-auto bg-[#0d1117] p-4 sm:p-8">
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <button
                                type="button"
                                onClick={() => router.push("/dashboard")}
                                className="mb-3 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back to workspace
                            </button>
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">Settings</p>
                            <h1 className="mt-1 text-3xl font-semibold">Profile</h1>
                            <p className="mt-1 text-sm text-gray-400">Manage your account details and security.</p>
                        </div>
                        <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Account active
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                if (editing) {
                                    setEditing(false);
                                    setName(user?.name || "");
                                    setAvatar(user?.avatar || "");
                                    setAvatarFile(null);
                                } else {
                                    setEditing(true);
                                }
                            }}
                            className="self-start rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                        >
                            {editing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>

                    {(msg || error) && <p className={`rounded-xl border px-4 py-3 text-sm ${error ? "border-red-400/20 bg-red-400/10 text-red-200" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"}`}>{error || msg}</p>}

                    <div className="rounded-xl border border-white/10 bg-[#161b22] p-6 sm:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/10">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-blue-200">
                                    {(user?.name || "C").slice(0, 1).toUpperCase()}
                                </div>
                            )}
                            <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-1 bg-black/70 py-1.5 text-[11px] text-white">
                                <Camera className="h-3.5 w-3.5" /> Change
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </label>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">{user?.name || "Clustria user"}</p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-gray-400"><Mail className="h-4 w-4" /> {user?.email}</p>
                            <p className="mt-3 text-xs text-gray-500">Images are stored with your profile. Max 2 MB.</p>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-xl border border-white/10 bg-[#161b22] p-6">
                        <h2 className="mb-6 text-lg font-semibold">Profile details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="mb-2 text-sm text-gray-400">Display name</p>
                                {editing ? (
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-lg font-semibold text-white">{user?.name}</p>
                                )}
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-gray-400">Email address</p>
                                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">{user?.email}</p>
                                <p className="mt-2 text-xs text-gray-500">Email changes are managed through your account provider.</p>
                            </div>

                            {editing && (
                                <button
                                    type="button"
                                    onClick={handleUpdateProfile}
                                    disabled={loading}
                                    className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save changes"}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#161b22] p-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><HardDrive className="h-5 w-5 text-yellow-300" /> Workspace usage</h2>
                        <p className="mt-1 text-sm text-gray-400">Your current storage footprint.</p>
                        <p className="mt-8 text-3xl font-semibold">{storage ? formatBytes(storage.storageUsed) : "—"}</p>
                        <p className="mt-1 text-sm text-gray-500">of {storage ? formatBytes(storage.storageLimit) : "—"} used</p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(Number(storage?.usedPercentage || 0), 100)}%` }} /></div>
                        <button onClick={() => router.push("/plan")} className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-gray-200 transition hover:bg-white/10">View plans</button>
                    </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#161b22] p-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><LockKeyhole className="h-5 w-5 text-emerald-300" /> Change password</h2>
                        <p className="mt-1 text-sm text-gray-400">Keep your account protected with a strong password.</p>
                        <div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-2">
                            <input
                                type="password"
                                placeholder="Old password"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-500/20"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New password"
                                minLength={8}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-500/20"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={handleChangePassword}
                                disabled={loading}
                                className="rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-medium text-emerald-200 ring-1 ring-emerald-400/20 transition hover:bg-emerald-400/25 disabled:opacity-50 md:col-span-2 md:w-fit"
                            >
                                {loading ? "Updating..." : "Update password"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
