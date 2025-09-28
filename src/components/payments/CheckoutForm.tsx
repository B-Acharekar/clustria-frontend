'use client'

import { useState } from 'react'
import { CreditCard, User, Mail, MoveLeft, Landmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { Plan } from './PlanSelection'

interface Props {
  plan: Plan
  onBack: () => void
  onSuccess: () => void
}

export default function CheckoutForm({ plan, onBack, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 1500)) // simulate API
      onSuccess()
    } catch {
      alert('Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/90 p-6 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl text-white"
      >
        <button onClick={onBack} className="mb-4 text-indigo-400 underline">
          <MoveLeft/>
        </button>

        <h2 className="text-3xl font-bold mb-1">{plan.title} Plan</h2>
        <p className="text-2xl text-gray-300 mb-6">{plan.price}</p>

        {/* Payment tabs */}
        <div className="flex gap-2 mb-6">
          {['card', 'upi', 'netbanking'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method as any)}
              className={`flex-1 px-4 py-2 rounded-t-xl border-b-2 text-center font-medium transition ${
                paymentMethod === method
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {method === 'card' && <CreditCard className="inline w-4 h-4 mr-1" />}
              {method === 'upi' && (
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg" className="inline w-4 h-4 mr-1" />
              )}
              {method === 'netbanking' && (
                <Landmark className="inline w-4 h-4 mr-1"/>
              )}
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        {/* Payment forms */}
        {paymentMethod === 'card' && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Card Number</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                className="w-1/2 pl-3 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="CVC"
                required
                className="w-1/2 pl-3 pr-3 py-2 rounded-xl bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay ${plan.price}`}
            </button>
          </form>
        )}

        {paymentMethod === 'upi' && (
          <div className="flex flex-col gap-4 items-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 w-full">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/UPI_Logo.png" className="w-6 h-6" />
              Pay with UPI
            </button>
            <p className="text-gray-400 text-sm text-center mt-1">You will be redirected to your UPI app</p>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="flex flex-col gap-4 items-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 w-full">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Bank_icon.png" className="w-6 h-6" />
              Pay with NetBanking
            </button>
            <p className="text-gray-400 text-sm text-center mt-1">Securely pay using your bank account</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
