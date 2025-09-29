'use client'

import { useEffect } from 'react'

export default function RazorpayButton() {
  useEffect(() => {
    // Wait for the div to exist
    const container = document.getElementById('razorpay-button-container')
    if (!container) return

    // Dynamically create script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.setAttribute('data-payment_button_id', 'pl_RMEBy3WMlQ4dzm')
    script.async = true

    container.appendChild(script)

    return () => {
      // Cleanup
      container.innerHTML = ''
    }
  }, [])

  return <div id="razorpay-button-container" className="w-full flex justify-center" />
}
