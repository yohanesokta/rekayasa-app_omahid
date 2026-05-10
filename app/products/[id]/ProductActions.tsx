'use client'

import { ShoppingCart, Heart } from 'lucide-react'
import { addToCart } from '@/app/cart/actions'
import { toggleWishlist } from '@/app/wishlist/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter()
  const [loadingCart, setLoadingCart] = useState(false)
  const [loadingWishlist, setLoadingWishlist] = useState(false)

  const handleBuyNow = () => {
    // Navigate directly to checkout page with this item as a query param
    router.push(`/checkout?productId=${productId}`)
  }

  const handleAddToCart = async () => {
    setLoadingCart(true)
    const res = await addToCart(productId)
    setLoadingCart(false)
    if (res.error) {
      alert(res.error)
    } else {
      alert('Ditambahkan ke keranjang')
    }
  }

  const handleToggleWishlist = async () => {
    setLoadingWishlist(true)
    const res = await toggleWishlist(productId)
    setLoadingWishlist(false)
    if (res.error) {
      alert(res.error)
    } else {
      alert('Wishlist diupdate')
    }
  }

  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={handleBuyNow}
        className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-xl tracking-widest transition-all shadow-lg shadow-green-400/30"
      >
        BELI SEKARANG
      </button>
      <button
        onClick={handleAddToCart}
        disabled={loadingCart}
        className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center text-[#070864] hover:border-[#0088FF] hover:text-[#0088FF] transition-all shadow-sm disabled:opacity-50"
        title="Tambah ke Keranjang"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
      <button
        onClick={handleToggleWishlist}
        disabled={loadingWishlist}
        className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-red-300 hover:text-red-500 transition-all shadow-sm disabled:opacity-50"
        title="Wishlist"
      >
        <Heart className="w-5 h-5" />
      </button>
    </div>
  )
}
