"use client";

import { Shield, CreditCard, Link as LinkIcon, User, Bell, Settings as Gear } from "lucide-react";
import clsx from "clsx";

interface Props {
  current: string;
  onSelect: (section: string) => void;
  collapsed?: boolean;
}

export default function SettingsInnerSidebar({ current, onSelect, collapsed }: Props) { 
  const items = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "plan", label: "Plan & Billing", icon: CreditCard },
    { id: "apps", label: "Connected Apps", icon: LinkIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Gear },
  ];

  return (
    <div
      className={clsx(
        "bg-[#161b22] text-white h-screen flex flex-col border-r border-white/10 transition-all duration-300",
        collapsed ? "w-0 overflow-hidden" : "w-56"
      )}
    >
      {/* Heading */}
      {!collapsed && (
        <div className="border-b border-white/10 px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">
          Settings
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="flex flex-col mt-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 w-full text-left rounded-r-lg transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white border-l-4 border-blue-400 font-medium"
                    : "text-gray-300 hover:bg-white/10"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
