"use client";

import { useState } from "react";

export default function NotificationsSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 space-y-4">
      <h2 className="text-xl font-semibold">Notifications</h2>

      <div className="flex items-center justify-between">
        <p>Email Notifications</p>
        <input
          type="checkbox"
          checked={emailNotif}
          onChange={() => setEmailNotif((prev) => !prev)}
          className="w-5 h-5 accent-blue-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <p>Push Notifications</p>
        <input
          type="checkbox"
          checked={pushNotif}
          onChange={() => setPushNotif((prev) => !prev)}
          className="w-5 h-5 accent-blue-600"
        />
      </div>
    </div>
  );
}
