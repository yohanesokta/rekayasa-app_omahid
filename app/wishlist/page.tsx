import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function WishlistPage() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: {
      product: { include: { images: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen font-sans text-slate-900" style={{ background: '#EEF2FA' }}>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-[#070864] mb-8">Wishlist Anda</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-400 mb-4">Wishlist Anda Kosong</h2>
            <Link href="/search" className="inline-block bg-[#070864] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0088FF] transition-all">
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col group">
                <Link href={`/products/${item.productId}`} className="flex-1">
                  <div className="h-48 bg-slate-100 overflow-hidden">
                    {item.product.images[0]?.url ? (
                      <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#070864] mb-2 line-clamp-1 group-hover:text-[#0088FF] transition-colors">
                      {item.product.name}
                    </h3>
                    <p className="text-green-600 font-black text-lg">Rp {item.product.price.toLocaleString('id-ID')}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
