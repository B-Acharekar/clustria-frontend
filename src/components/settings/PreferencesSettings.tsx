"use client";

import { useState } from "react";

export default function PreferencesSettings() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("English");

  return (
    <div className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 space-y-4">
      <h2 className="text-xl font-semibold">Preferences</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">Theme</p>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-800/60 text-white p-2 rounded w-full"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-1">Language</p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800/60 text-white p-2 rounded w-full"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  );
}
