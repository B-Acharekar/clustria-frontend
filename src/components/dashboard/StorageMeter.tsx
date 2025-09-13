"use client";

export default function StorageMeter() {
  const used = 13.8;
  const total = 15;
  const percent = (used / total) * 100;

  return (
    <div className="p-4 rounded-xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-lg transition duration-500 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-200">Storage</span>
        <span className="text-xs font-semibold text-gray-400">
          {used} GB / {total} GB
        </span>
      </div>

      {/* Slim Premium Glassy Progress Bar */}
      <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm group">
        {/* Metallic Glassy Fill */}
        <div
          style={{ width: `${percent}%` }}
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-white/40 via-gray-300/20 to-white/40 backdrop-blur-xl border border-white/20 transition-[width] duration-700 ease-out overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        >
          {/* Glossy reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-30" />
          {/* Shine sweep animation */}
          <div className="absolute inset-0 animate-[shine_3s_linear_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="text-gray-500">Used</span>
        <span className="text-gray-400">{percent.toFixed(0)}%</span>
      </div>

      {/* Shine animation keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
