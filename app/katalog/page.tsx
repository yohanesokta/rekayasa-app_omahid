import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function KatalogPage() {
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#070864] mb-4">Katalog Produk</h1>
          <p className="text-slate-500 max-w-2xl">Jelajahi koleksi furniture terbaik kami, dirancang untuk kenyamanan dan keindahan setiap sudut rumah Anda.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <p className="text-slate-400 font-medium">Belum ada produk dalam katalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                  {p.images[0] ? (
                    <img 
                      src={p.images[0].url} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[10px] font-bold text-slate-300 uppercase">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#070864] shadow-lg hover:scale-110 transition-transform">
                        <ShoppingCart className="w-5 h-5" />
                     </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category || 'Furniture'}</p>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#0088FF] transition-colors truncate">{p.name}</h3>
                  <p className="text-sm font-black text-[#070864] mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
