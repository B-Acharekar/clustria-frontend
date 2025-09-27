"use client";

interface Props {
  name: string;
  onUpgrade: () => void;
}

export default function PlanCard({ name, onUpgrade }: Props) {
  return (
    <div className="rounded-2xl bg-black/40 shadow-lg backdrop-blur-xl border border-white/10 p-6 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Plan: {name}</h2>
        <p className="text-gray-300">
          Upgrade to unlock more storage and advanced features.
        </p>
      </div>
      <button
        className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
        onClick={onUpgrade}
      >
        Upgrade Plan
      </button>
    </div>
  );
}
