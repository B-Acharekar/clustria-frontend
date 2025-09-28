"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import InnerSidebar from "@/components/dashboard/InnerSidebar";
import PlanSelection, { Plan } from "@/components/payments/PlanSelection";
import CheckoutForm from "@/components/payments/CheckoutForm";

const plans: Plan[] = [
  {
    title: 'Free',
    price: '$0',
    description: 'Explore AI file organization for free.',
    features: ['50 credits/month', 'AI Chat', 'Semantic Search', 'Demo Mode'],
  },
  {
    title: 'Pro',
    price: '$20',
    description: 'For personal use or small teams.',
    features: ['1,000 credits/month', 'Automated Sorting', 'Smarter AI Model', 'Up to 5 members'],
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Advanced control for organizations.',
    features: ['Custom Limits', 'Enterprise Cloud Integration', 'Team Billing', 'SSO (SAML / OIDC)'],
  },
];

export default function PlanPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      {/* InnerSidebar */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <InnerSidebar collapsed={collapsed} />
      </motion.div>

      {/* Main content */}
      <motion.main
        className="flex-1 flex flex-col overflow-y-auto p-6"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        {!selectedPlan ? (
          <PlanSelection plans={plans} onSelect={setSelectedPlan} />
        ) : !success ? (
          <CheckoutForm
            plan={selectedPlan}
            onBack={() => setSelectedPlan(null)}
            onSuccess={() => setSuccess(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/60 p-12 rounded-2xl border border-white/10 text-center shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for subscribing to the {selectedPlan.title} plan.
              </p>
              <a
                href="/dashboard"
                className="inline-block px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Go to Dashboard
              </a>
            </motion.div>
          </div>
        )}
      </motion.main>
    </div>
  );
}
