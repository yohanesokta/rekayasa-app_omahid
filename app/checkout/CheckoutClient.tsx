'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutClient({ items }: { items: any[] }) {
  const router = useRouter()
  const [customNotes, setCustomNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
          customNotes
        })
      })
      const data = await res.json()
      if (res.ok && data.paymentUrl) {
        // Open Midtrans payment page in same window or new tab.
        // Midtrans typically redirects user to the payment url.
        window.location.href = data.paymentUrl
      } else {
        alert('Gagal membuat transaksi: ' + (data.error || 'Unknown error'))
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan sistem.')
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
      {/* Left: Items and Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-[32px] p-8 shadow-sm">
          <h2 className="text-xl font-black text-[#070864] mb-6">Barang yang Dibeli</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                  {item.product.images[0]?.url ? (
                    <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-[10px] text-slate-300">Img</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#070864] line-clamp-1">{item.product.name}</h3>
                  <p className="text-sm text-slate-500">{item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="font-black text-green-600">
                  Rp {(item.quantity * item.product.price).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm">
          <h2 className="text-xl font-black text-[#070864] mb-4">Catatan Tambahan (Pre-Order / Custom)</h2>
          <p className="text-sm text-slate-500 mb-4">Jika Anda memesan produk custom (bentuk, ukuran, warna khusus), silakan jelaskan secara detail di sini.</p>
          <textarea
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            rows={5}
            placeholder="Contoh: Tolong buatkan meja dengan panjang 150cm dan warna kayu jati gelap."
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-[#0088FF] focus:ring-0 outline-none text-sm text-slate-700 placeholder:text-slate-300 transition-all resize-none"
          />
        </div>
      </div>

      {/* Right: Summary */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm h-fit sticky top-8">
        <h2 className="text-xl font-black text-[#070864] mb-6">Ringkasan Pembayaran</h2>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500">Total Harga</span>
          <span className="font-bold text-slate-800">Rp {totalAmount.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-100">
          <span className="text-slate-800 font-bold">Total Tagihan</span>
          <span className="text-2xl font-black text-green-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full h-14 bg-[#070864] hover:bg-[#0088FF] text-white font-black text-sm rounded-xl tracking-widest transition-all shadow-lg shadow-[#070864]/30 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? 'MEMPROSES...' : 'BAYAR SEKARANG'}
        </button>
        <p className="text-xs text-center text-slate-400 mt-4">
          Pembayaran aman dengan Midtrans.
        </p>
      </div>
    </div>
  )
}
