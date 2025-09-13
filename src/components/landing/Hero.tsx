'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 bg-[#0b0b0f] overflow-hidden">
      {/* Radial grain background */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1a1a1a]/40 via-[#0b0b0f]/80 to-black" />

      {/* Soft indigo glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-indigo-500/10 blur-[140px] rounded-full z-0" />

      {/* Faint second glow for depth */}
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full z-0" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-gray-300 to-gray-600 bg-clip-text text-transparent leading-tight"
        >
          Organize Everything with AI
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto"
        >
          Clustria helps you clean, categorize, and manage your digital life — from local drives to cloud — just by talking.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block mt-10"
        >
          <a
            href="/signup"
            role="button"
            className="px-6 py-3 text-black font-medium rounded-xl bg-white/90 backdrop-blur-md shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            Start for Free
          </a>
        </motion.div>
      </div>
    </section>
  )
}
