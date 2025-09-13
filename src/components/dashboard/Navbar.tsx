// src/components/dashboard/Navbar.tsx
"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-3 flex justify-between items-center"
    >
      <h1 className="text-white text-lg font-semibold">Clustria Drive</h1>
      <input
        type="text"
        placeholder="Search files..."
        className="bg-white/10 text-white px-3 py-1 rounded-lg outline-none"
      />
    </motion.nav>
  );
}
