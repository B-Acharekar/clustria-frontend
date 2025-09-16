"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

interface ExcelPreviewProps {
  file: any;
  previewUrl: string;
}

export default function ExcelPreview({ file, previewUrl }: ExcelPreviewProps) {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        setLoading(true);
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });
        setData(jsonData);
      } catch (error) {
        console.error("Failed to parse Excel file", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndParse();
  }, [previewUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black/40 rounded-2xl backdrop-blur-md">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-black/30 p-4 rounded-2xl backdrop-blur-sm overflow-auto">
      <motion.table
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-w-[300px] max-w-full bg-white/10 rounded-xl shadow-lg border border-white/20 text-sm text-white"
      >
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/5" : ""}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-white/20 px-4 py-2 text-left break-words max-w-[200px]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}
