'use client'

import {
  ShieldCheck,
  UploadCloud,
  FolderKanban,
  LockKeyhole,
} from 'lucide-react'

const features = [
  {
    title: 'Secure File Upload',
    description: 'Drag-and-drop encrypted uploads to the cloud or your device.',
    icon: UploadCloud,
  },
  {
    title: 'AI-Powered Organization',
    description: 'Smart categorization based on content and context.',
    icon: FolderKanban,
  },
  {
    title: 'Zero-Knowledge Encryption',
    description: 'We can’t access your files. Only you can.',
    icon: LockKeyhole,
  },
  {
    title: 'BYOK Support',
    description: 'Bring your own keys — your data, your rules.',
    icon: ShieldCheck,
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 tracking-tight">
          Why Clustria?
        </h2>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
