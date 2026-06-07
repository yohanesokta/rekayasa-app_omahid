'use client'

import { useState } from 'react'
import { completeOrder } from './actions'

export default function OrderCompleteButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false)

  const handleComplete = async () => {
    if (!confirm('Apakah Anda yakin telah menerima pesanan ini? Status akan berubah menjadi Selesai.')) {
      return
    }

    setLoading(true)
    const res = await completeOrder(orderId)
    setLoading(false)

    if (res.error) {
      alert(res.error)
    } else {
      alert('Pesanan telah dikonfirmasi diterima.')
    }
  }

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all disabled:opacity-50"
    >
      {loading ? 'MEMPROSES...' : 'PESANAN DITERIMA'}
    </button>
  )
}
