'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateOrderStatus } from './actions'

export default function OrderActionForm({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await updateOrderStatus(order.id, status, trackingNumber)
    setLoading(false)
    if (res.error) {
      alert(res.error)
    } else {
      alert('Status berhasil diupdate')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-600 mb-2">Status Pesanan</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#0088FF] focus:ring-0 outline-none transition-all font-bold text-slate-700 bg-slate-50"
        >
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="PROCESSING">PROCESSING (Proses Pembuatan/Pre-Order)</option>
          <option value="SHIPPED">SHIPPED (Sedang Dikirim)</option>
          <option value="COMPLETED">COMPLETED (Selesai)</option>
          <option value="CANCELED">CANCELED (Dibatalkan)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-600 mb-2">Nomor Resi (Jika Shipped)</label>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Masukkan No. Resi"
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#0088FF] focus:ring-0 outline-none transition-all font-bold text-slate-700 bg-slate-50"
        />
        <p className="text-xs text-slate-400 mt-2">Ini digunakan untuk simulasi tracking pesanan di sisi pelanggan.</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-xl tracking-widest transition-all shadow-lg shadow-green-400/30 disabled:opacity-50"
      >
        {loading ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
      </button>
    </form>
  )
}
