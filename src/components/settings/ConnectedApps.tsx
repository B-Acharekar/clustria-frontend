"use client";

import { useState } from "react";

interface App {
  name: string;
  logo: string;
  connected: boolean;
}

export default function ConnectedApps() {
  const [apps, setApps] = useState<App[]>([
    { name: "Google Drive", logo: "/logos/google-drive.png", connected: false },
    { name: "OneDrive", logo: "/logos/onedrive.png", connected: false },
  ]);

  const handleConnectApp = (appName: string) => {
    alert(`Connected ${appName} successfully!`);
    setApps((prev) =>
      prev.map((app) =>
        app.name === appName ? { ...app, connected: true } : app
      )
    );
  };

  return (
    <div className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 space-y-3">
      <h2 className="text-xl font-semibold mb-4">Connected Apps</h2>

      {apps.map((app) => (
        <div
          key={app.name}
          className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <img src={app.logo} alt={app.name} className="w-8 h-8" />
            <p>{app.name}</p>
          </div>
          {app.connected ? (
            <span className="text-green-400 font-semibold">Connected</span>
          ) : (
            <button
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
              onClick={() => handleConnectApp(app.name)}
            >
              Connect
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
