"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Download, FileText, Loader2, ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";

type SharedFile = {
  id: string;
  filename: string;
  size?: number;
  metadata?: { type?: string };
  expiresAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function formatBytes(bytes?: number) {
  if (!bytes) return "Unknown size";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export default function SharedFilePage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const [file, setFile] = useState<SharedFile | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const expiresLabel = useMemo(() => {
    if (!file?.expiresAt) return "";
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(file.expiresAt));
  }, [file?.expiresAt]);

  useEffect(() => {
    if (!token || !API_URL) {
      setError("This share link is not configured correctly.");
      return;
    }

    const load = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/files/shared/${encodeURIComponent(token)}`
        );
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || "This share link is invalid or expired.");
        setFile(body.file);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load this file.");
      }
    };

    load();
  }, [token]);

  const download = async () => {
    if (!token || !API_URL) return;
    setDownloading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/api/files/shared/${encodeURIComponent(token)}/download`
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Unable to download this file.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file?.filename || "shared-file";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to download this file.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300">Clustria secure share</p>
                <h1 className="mt-0.5 text-xl font-semibold">A file was shared with you</h1>
              </div>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8">
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">This file is unavailable</p>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            ) : !file ? (
              <div className="flex items-center gap-3 py-10 text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Loading shared file...</span>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <FileText className="h-6 w-6 text-slate-700" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold text-slate-900">{file.filename}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatBytes(file.size)}
                      {file.metadata?.type ? ` · ${file.metadata.type}` : ""}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-600">
                  This link expires on <span className="font-medium text-slate-800">{expiresLabel}</span>.
                </p>

                <button
                  type="button"
                  onClick={download}
                  disabled={downloading}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {downloading ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Download className="h-5 w-5" aria-hidden="true" />
                  )}
                  {downloading ? "Preparing download..." : "Download file"}
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
