'use client'

export default function SmartSearch() {
  return (
    <section className="py-24 px-6 bg-[#0c0c0f] border-t border-white/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 text-left">
        {/* Left Block */}
        <div>
          <h3 className="text-3xl font-semibold mb-4 tracking-tight leading-tight">
            Search by Meaning
          </h3>
          <p className="text-gray-300 mb-4 text-lg">
            Don&apos;t remember the file name? No problem.
            Use natural language like{' '}
            <span className="italic text-white">&quot;project report from June&quot;</span> 
            or{' '}
            <span className="italic text-white">&quot;slides shared by Riya&quot;</span> to instantly find the document you&apos;re looking for.
          </p>
          <p className="text-gray-500 text-sm">
            Powered by deep semantic vector search that understands context — not just keywords.
          </p>
        </div>

        {/* Right Block */}
        <div>
          <h3 className="text-3xl font-semibold mb-4 tracking-tight leading-tight">
            Automated Folder Rules
          </h3>
          <p className="text-gray-300 mb-4 text-lg">
            Create smart rules to automatically file incoming documents by type, tags, content, sender, or even tone.
          </p>
          <p className="text-gray-500 text-sm">
            It&apos;s like having an AI assistant that keeps your folders tidy while you focus on the big stuff.
          </p>
        </div>
      </div>
    </section>
  )
}
