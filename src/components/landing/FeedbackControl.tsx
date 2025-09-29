'use client'

export default function FeedbackControl() {
  return (
    <section className="py-24 px-6 bg-[#0c0c0f] border-t border-white/10">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          AI that Learns from You
        </h2>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          You stay in control while Clustria gets smarter with every interaction.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="bg-gray-900/40 p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all">
          <h3 className="text-xl font-semibold text-white mb-3">Refine with Feedback</h3>
          <p className="text-gray-400 leading-relaxed">
            Not happy with an action the AI took? Just say so. Clustria adapts and evolves its suggestions in real-time, learning your preferences.
          </p>
        </div>

        <div className="bg-gray-900/40 p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all">
<h3 className="text-xl font-semibold text-white mb-3">You&apos;re in Control</h3>
          <p className="text-gray-400 leading-relaxed">
            Every change is fully previewed. Accept, reject, or customize — nothing happens without your approval.
          </p>
        </div>
      </div>
    </section>
  )
}
