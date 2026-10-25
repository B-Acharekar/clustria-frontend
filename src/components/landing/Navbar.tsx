'use client'

import { motion } from 'framer-motion'
import { Github, LogIn, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      role="navigation"
      aria-label="Main Navigation"
      className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          Clustria
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="rounded-lg border border-white/10 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-5 text-sm text-gray-300 md:flex">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a
            href="https://github.com/B-Acharekar/clustria-frontend"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Github className="h-4 w-4" /> Open source
          </a>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-1.5 hover:border-white hover:text-white transition"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 font-medium text-black hover:bg-gray-200 transition"
          >
            <Sparkles className="h-4 w-4" /> Get started
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <a href="#features" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">Features</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">Pricing</a>
            <a href="https://github.com/B-Acharekar/clustria-frontend" target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white">Open source on GitHub</a>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg border border-white/20 px-3 py-2 text-center hover:border-white hover:text-white">Login</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="rounded-lg bg-white px-3 py-2 text-center font-medium text-black hover:bg-gray-200">Get started</Link>
          </div>
        </div>
      )}


    </motion.nav>
  )
}
