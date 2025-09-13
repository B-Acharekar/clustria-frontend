'use client'

import { CheckCircle2 } from 'lucide-react' // install via: npm install lucide-react

const plans = [
  {
    title: 'Free',
    price: '$0',
    description: 'Explore AI file organization for free.',
    features: [
      '50 credits/month',
      'AI Chat',
      'Semantic Search',
      'Demo Mode',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    title: 'Pro',
    price: '$20',
    description: 'For personal use or small teams.',
    features: [
      '1,000 credits/month',
      'Automated Sorting',
      'Smarter AI Model',
      'Up to 5 members',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Advanced control for organizations.',
    features: [
      'Custom Limits',
      'Enterprise Cloud Integration',
      'Team Billing',
      'SSO (SAML / OIDC)',
    ],
    cta: 'Contact us',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-gray-900/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col ${
                plan.highlight ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-indigo-600 text-white rounded-full uppercase tracking-wide">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
              <p className="text-4xl font-semibold mb-2">{plan.price}<span className="text-base text-gray-400 font-normal">{plan.price !== 'Custom' && '/mo'}</span></p>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <ul className="flex-1 mb-6 space-y-3 text-gray-300 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-auto inline-block text-center px-4 py-2 rounded-md font-medium border transition ${
                  plan.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent'
                    : 'border-white/20 hover:border-white text-white/80 hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
