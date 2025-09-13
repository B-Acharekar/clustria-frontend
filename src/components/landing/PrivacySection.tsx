'use client'

export default function PrivacySection() {
  return (
    <section className="py-24 px-6 bg-black border-t border-white/10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 text-left">
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-white">
            Built with Privacy in Mind
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Your data stays yours — always. Clustria never stores your files, reads their contents without your explicit action, or uses them for training.
          </p>
          <p className="text-gray-500 text-sm">
            You decide exactly what the AI sees. Access is folder-specific, permission-based, and completely transparent.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-white">
            Local File Support (Coming Soon)
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Connect Clustria directly to your local folders to organize screenshots, clean downloads, and declutter your desktop — all without internet sync.
          </p>
          <p className="text-gray-500 text-sm">
            Files never leave your device. No upload, no cloud — just smart local automation.
          </p>
        </div>
      </div>
    </section>
  )
}
