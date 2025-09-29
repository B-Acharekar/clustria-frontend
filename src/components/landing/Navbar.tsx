'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Layout, Mail, Users, Package, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isLanding, setIsLanding] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setIsLanding(pathname === '/')
  }, [pathname])

  const links = [
    { name: 'Dashboard', icon: Home, href: '#' },
    { name: 'Kanban', icon: Layout, href: '#' },
    { name: 'Inbox', icon: Mail, href: '#' },
    { name: 'Users', icon: Users, href: '#' },
    { name: 'Products', icon: Package, href: '#' },
    { name: 'Sign In', icon: LogIn, href: '#' },
    { name: 'Sign Up', icon: UserPlus, href: '#' },
  ]

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

        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <Link
            href="/login"
            className="px-4 py-1.5 border border-white/20 rounded-lg hover:border-white hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>


    </motion.nav>
  )
}
