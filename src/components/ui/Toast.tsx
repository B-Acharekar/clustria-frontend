"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface ToastProps {
  id: string;
  message: string;
  variant?: "default" | "error";
}

let addToastCallback: ((toast: Omit<ToastProps, "id">) => void) | null = null;
let toastId = 0;

export interface ToastProps {
  id: string;
  message: string;
  variant?: "default" | "error";
}

export const useToast = () => {
  return {
    toast: (message: string, variant: "default" | "error" = "default") => {
      if (addToastCallback) addToastCallback({ message, variant });
    },
  };
};


export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    addToastCallback = (toastData) => {
      const id = `${++toastId}`;
      setToasts((prev) => [...prev, { ...toastData, id }]);
      setTimeout(() => removeToast(id), 3000); // auto-remove after 3s
    };
    return () => {
      addToastCallback = null;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-3 rounded shadow flex justify-between items-center min-w-[200px] ${
            t.variant === "error" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
          }`}
        >
          <span>{t.message}</span>
          <button onClick={() => removeToast(t.id)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
