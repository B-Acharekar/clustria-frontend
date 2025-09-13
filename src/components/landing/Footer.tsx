'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <div className="text-lg font-bold text-white mb-2">Clustria</div>
          <p className="text-gray-500">
            AI-powered file organization and automation. <br /> Clean, smart, effortless.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col items-center md:items-start">
          <div className="font-medium text-white mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li>
              <Link href="#features" className="hover:text-white transition">Features</Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-white transition">About</Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right flex flex-col justify-between">
          <p>© {new Date().getFullYear()} Clustria. All rights reserved.</p>
          <p className="text-xs text-gray-600 mt-2">
            Made with ❤️ for productivity.
          </p>
        </div>
      </div>
    </footer>
  )
}
