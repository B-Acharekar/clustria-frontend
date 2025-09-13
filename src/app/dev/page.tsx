import Image from "next/image";

export default function Dev() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 font-mono">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="border-b border-gray-700 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Clustria Frontend
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Personalized Cloud Storage for productivity-driven and neurodiverse users.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            This is the developer entry point for the Clustria frontend, built with Next.js (App Router) and Tailwind CSS.
            It serves as the UI layer for the platform's file system, AI features, and productivity tools. All developers — frontend, backend, AI, and cloud — should coordinate here.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-medium mb-4 border-b border-gray-700 pb-2">Frontend Devs: To-Do</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
              <li>Implement authentication UI (login, signup, forgot password).</li>
              <li>Build file dashboard: upload, preview, rename, delete, share.</li>
              <li>Add folder & tagging system (drag-and-drop optional).</li>
              <li>Integrate AI: file summarizer UI, reminder prompts, chatbot UI.</li>
              <li>Build distraction-reduction modes (focus views, minimal UIs).</li>
              <li>Create admin panel layout for internal tools.</li>
              <li>Ensure responsive design across breakpoints.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4 border-b border-gray-700 pb-2">Backend Devs: What's Needed</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
              <li>API endpoints for auth, file metadata, tagging, reminders.</li>
              <li>Upload/download integration with Azure Blob Storage.</li>
              <li>Session/token-based user handling (JWT or OAuth).</li>
              <li>Database structure for users, files, tags, AI summaries.</li>
              <li>Webhook support for Razorpay payment status.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4 border-b border-gray-700 pb-2">AI/NLP Devs: What to Expose</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
              <li>Endpoints for document summarization (PDF, DOCX, TXT).</li>
              <li>Chatbot API for productivity questions + file queries.</li>
              <li>Daily digest & smart reminder generation service.</li>
              <li>Query caching layer for frequent requests.</li>
              <li>Rate-limiting or fallback behavior for overload cases.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4 border-b border-gray-700 pb-2">Cloud/Infra: What's Expected</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
              <li>Azure Blob Storage container setup with access control.</li>
              <li>Deployment pipelines (CI/CD) for frontend and backend.</li>
              <li>Secrets management for API keys, storage credentials.</li>
              <li>Logging & monitoring stack (basic at MVP level).</li>
              <li>Auto-scaling & rate limits for AI microservices.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Setup</h2>
          <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-x-auto">
            {`git clone https://github.com/your-org/clustria-frontend
cd clustria-frontend
npm install
npm run dev`}
          </pre>
          <p className="text-gray-500 text-xs">
            Edit <code>src/app/page.tsx</code> to start. Use <code>src/components</code> for modular UI parts.
          </p>
        </section>

        <footer className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          Clustria © {new Date().getFullYear()} – Designed for focus, built for productivity. <br />
          Confused? Contact the lead: <a href="https://github.com/B-Acharekar" className="underline hover:text-white">B-Acharekar</a>
        </footer>
      </div>
    </main>
  );
}
