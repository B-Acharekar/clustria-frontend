'use client'

export default function Connections() {
  return (
    <section className="py-24 px-6 bg-[#0c0c0f] border-t border-white/10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 text-left">
        <div>
          <h3 className="text-3xl font-semibold mb-4">Seamless Cloud Integration</h3>
          <p className="text-gray-300 mb-4">
            Instantly connect your Google Drive, Dropbox, OneDrive, or any cloud provider. No extra setup — just log in and go.
          </p>
          <p className="text-gray-500 text-sm">
            No syncing or duplication. Clustria works directly with your existing structure in real time.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4">Try Clustria — Risk-Free</h3>
          <p className="text-gray-300 mb-4">
            Explore the full experience using sample files in Demo Mode — no sign-up or installation required.
          </p>
          <p className="text-gray-500 text-sm">
            Perfect for demos, team onboarding, or evaluating the platform before connecting real data.
          </p>
        </div>
      </div>
    </section>
  )
}
