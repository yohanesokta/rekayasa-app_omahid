'use client'

import { Trash2, Minus, Plus } from 'lucide-react'
import { updateCartItemQuantity, removeCartItem } from './actions'
import { useState } from 'react'
import Link from 'next/link'

export default function CartItem({ item }: { item: any }) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (newQty: number) => {
    if (newQty < 1) return
    setLoading(true)
    setQuantity(newQty)
    await updateCartItemQuantity(item.id, newQty)
    setLoading(false)
  }

  const handleRemove = async () => {
    if (confirm('Hapus produk ini dari keranjang?')) {
      setLoading(true)
      await removeCartItem(item.id)
    }
  }

  const imgUrl = item.product.images[0]?.url

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm flex gap-6 items-center">
      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        {imgUrl ? (
          <img src={imgUrl} alt={item.product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-300">No Img</div>
        )}
      </div>

      <div className="flex-1">
        <Link href={`/products/${item.product.id}`} className="font-bold text-lg text-[#070864] hover:text-[#0088FF] transition-colors line-clamp-1 mb-1">
          {item.product.name}
        </Link>
        <p className="font-black text-green-600 mb-4">Rp {item.product.price.toLocaleString('id-ID')}</p>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-fit">
            <button
              onClick={() => handleUpdate(quantity - 1)}
              disabled={loading || quantity <= 1}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-slate-400 shadow-sm hover:text-slate-600 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-bold text-slate-600 text-sm">{quantity}</span>
            <button
              onClick={() => handleUpdate(quantity + 1)}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-slate-400 shadow-sm hover:text-[#070864] disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={loading}
            className="text-red-400 hover:text-red-600 transition-colors p-2"
            title="Hapus item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
