"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm text-gray-600 hover:text-black transition"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Back
    </button>
  );
}
