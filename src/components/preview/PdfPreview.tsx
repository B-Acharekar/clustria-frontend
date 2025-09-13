"use client";

interface PdfPreviewProps {
  file: any;
  previewUrl: string;
}

export default function PdfPreview({ file, previewUrl }: PdfPreviewProps) {
  return (
    <iframe
      src={previewUrl}
      className="w-full h-full rounded-none border-none"
      title={file.filename}
    />
  );
}
