'use client'

import { CheckCircle2 } from 'lucide-react'

export interface Plan {
  title: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
}

interface Props {
  plans: Plan[]
  onSelect: (plan: Plan) => void
}

export default function PlanSelection({ plans, onSelect }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-8 text-white">
      {plans.map((plan) => (
        <div
          key={plan.title}
          onClick={() => onSelect(plan)}
          className={`relative cursor-pointer bg-gray-900/60 p-8 rounded-2xl border border-white/10 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col ${
            plan.highlight ? 'ring-2 ring-indigo-500' : ''
          }`}
        >
          {plan.highlight && (
            <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-indigo-600 text-white rounded-full uppercase tracking-wide">
              Recommended
            </span>
          )}
          <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
          <p className="text-4xl font-semibold mb-2">
            {plan.price}
            <span className="text-base text-gray-400 font-normal">
              {plan.price !== 'Custom' && '/mo'}
            </span>
          </p>
          <p className="text-gray-400 mb-6">{plan.description}</p>

          <ul className="flex-1 mb-6 space-y-3 text-gray-300 text-sm">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>

          <button className="mt-auto px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
            Select
          </button>
        </div>
      ))}
    </div>
  )
}
