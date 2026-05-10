import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import CartItem from './CartItem'

export default async function CartPage() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: { include: { images: true } } },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  const cartItems = cart?.items || []
  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen font-sans text-slate-900" style={{ background: '#EEF2FA' }}>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-[#070864] mb-8">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-400 mb-4">Keranjang Anda Kosong</h2>
            <Link href="/search" className="inline-block bg-[#070864] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0088FF] transition-all">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item as any} />
              ))}
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm h-fit">
              <h2 className="text-xl font-black text-[#070864] mb-6">Ringkasan Belanja</h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-bold">Total Harga ({cartItems.length} barang)</span>
                <span className="text-2xl font-black text-green-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg shadow-green-400/30 transition-all"
              >
                PROSES CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
