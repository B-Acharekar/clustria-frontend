"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { initiatePayment, confirmPayment } from "@/services/payment";

type Method = "card" | "upi" | "netbanking";

interface Props {
  planId: "pro" | "business";
  onClose: () => void;
  onSuccess: (plan: string, storageLimit: number) => void;
}

export default function PaymentModal({ planId, onClose, onSuccess }: Props) {
  const [method, setMethod] = useState<Method>("card");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<any>(null);

  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("SBI");

  const amount = planId === "pro" ? 2000 : 5000;
  const amountDisplay = `₹ ${amount.toLocaleString()}`;

  const handleInitiate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await initiatePayment({ plan: planId, method });
      if (res.success) {
        setSession(res.session);
        setStep(2);
      } else setError(res.message || "Failed to initiate payment");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    setError("");

    try {
      if (method === "card" && (!card.number || !card.name || !card.expiry || !card.cvv))
        throw new Error("Please fill all card details correctly");

      if (method === "upi" && !upiId) throw new Error("Enter valid UPI ID");

      const res = await confirmPayment({ paymentId: session?.paymentId || "fake-id", simulatedResult: "success", plan: planId });
      if (res.success) {
        setStep(3);
        setTimeout(() => {
          onSuccess(res.plan, res.storageLimit);
          onClose();
        }, 1200);
      } else throw new Error(res.message || "Payment failed");
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="bg-gray-900 rounded-xl w-[520px] shadow-xl p-6 text-white" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upgrade to {planId.toUpperCase()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold">X</button>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">Amount to pay</p>
          <p className="text-xl font-semibold">{amountDisplay}</p>
          <p className="text-gray-500 text-sm mt-1">Subscription: {planId.toUpperCase()} Plan</p>
        </div>

        {/* Step 1: Payment Method */}
        {step === 1 && (
          <div className="flex gap-3 mb-4">
            {(["card", "upi", "netbanking"] as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex-1 py-2 rounded border ${
                  method === m ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-800 border-gray-700 text-gray-300"
                }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Payment Form */}
        {step === 2 && (
          <div className="space-y-4">
            {method === "card" && (
              <div className="space-y-2">
                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                <input type="text" placeholder="Name on Card" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/YY" className="flex-1 p-2 border rounded bg-gray-800 text-white border-gray-700" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                  <input type="text" placeholder="CVV" className="w-24 p-2 border rounded bg-gray-800 text-white border-gray-700" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            )}
            {method === "upi" && (
              <div>
                <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700" value={upiId} onChange={e => setUpiId(e.target.value)} />
                <p className="text-gray-400 text-sm mt-1">Example: example@upi</p>
              </div>
            )}
            {method === "netbanking" && (
              <select className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700" value={bank} onChange={e => setBank(e.target.value)}>
                {["SBI", "HDFC", "ICICI"].map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <button onClick={handlePay} className="w-full py-2 bg-indigo-600 text-white rounded mt-2">{loading ? "Processing..." : `Pay ${amountDisplay}`}</button>
            <p className="text-xs text-gray-400 text-center mt-2">All transactions are secure and encrypted.</p>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <p className="text-green-500 text-xl font-semibold">Payment Successful!</p>
          </div>
        )}

        {step !== 3 && <button className="mt-4 text-gray-400 hover:text-white" onClick={onClose}>Cancel</button>}
      </motion.div>
    </motion.div>
  );
}
