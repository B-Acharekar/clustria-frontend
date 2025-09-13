// src/hooks/useFiles.ts
"use client";

import { useState, useEffect } from "react";
import { APIFile, fetchFiles } from "@/services/api";

export default function useFiles(path: string) {
  const [files, setFiles] = useState<APIFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFiles(path)
      .then(setFiles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [path]);

  return { files, loading, error };
}
