'use client'

import {
  FileText,
  Search,
  PencilLine,
  Trash2,
  FolderPlus,
} from 'lucide-react'
import { motion } from 'framer-motion'

const useCases = [
  {
    icon: FileText,
    title: 'Chat with your files',
    description: 'Ask questions about documents and get instant answers powered by AI.',
  },
  {
    icon: Search,
    title: 'Search by content',
    description: 'Find files by what they mean, not just their name, using semantic search.',
  },
  {
    icon: FolderPlus,
    title: 'Organize automatically',
    description: 'Set background rules for real-time file sorting and categorization.',
  },
  {
    icon: PencilLine,
    title: 'Rename in bulk',
    description: 'Let the AI clean up messy filenames and apply smart naming conventions.',
  },
  {
    icon: Trash2,
    title: 'Clean clutter',
    description: 'Remove duplicates, old versions, or unused files in a single click.',
  },
]

export default function UseCases() {
  return (
    <section className="py-24 px-6 bg-[#0c0c0f]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 tracking-tight">
          One Tool, Many Uses
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#111115] to-[#0f0f13] p-6 rounded-2xl border border-white/10 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 mb-4 group-hover:scale-110 transition">
                <useCase.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">
                {useCase.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
