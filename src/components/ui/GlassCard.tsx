// components/ui/GlassCard.tsx
import { ReactNode } from "react";

export default function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/5 shadow-xl backdrop-blur-xl p-6 border border-white/10">
      {children}
    </div>
  );
}
