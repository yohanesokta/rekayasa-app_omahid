import { Search, MapPin, Heart, ShoppingBag, User, ArrowRight, CreditCard, ShoppingCart, Sofa, Bed, Lamp, Box, LayoutGrid, Utensils, Monitor, Frame } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { images: true },
      orderBy: { createdAt: 'desc' },
      take: 8
    }),
    prisma.product.groupBy({
      by: ['category'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 4
    })
  ])

  const heroProduct = products[0]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header / Navbar */}
      <Navbar />

      <main>
        {/* Hero Banner */}
        <section className="w-full">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[400px]">
            {/* Image area (Left) */}
            <div className="md:w-[55%] relative bg-slate-100 min-h-[400px] bg-cover bg-center overflow-hidden flex items-center justify-center">
              {heroProduct?.images[0] ? (
                <img 
                  src={heroProduct.images[0].url} 
                  alt={heroProduct.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 font-medium">[ {heroProduct?.name || 'Kasur'} Image ]</div>
              )}
            </div>

            {/* Text area (Right) */}
            <div className="md:w-[45%] bg-[#9AA6B2] p-12 md:p-16 flex flex-col justify-center">
              <h3 className="text-[#0088FF] font-bold text-lg tracking-widest mb-6 uppercase">
                {heroProduct?.category || 'Katalog Baru'}
              </h3>
              <h2 className="text-white text-3xl md:text-4xl font-serif leading-snug mb-10">
                “{heroProduct?.description.substring(0, 100) || 'Nikmati kenyamanan maksimal dengan tempat tidur yang dirancang untuk gaya hidup modern.'}...”
              </h2>
              <div>
                <Link href={heroProduct ? `/search?q=${heroProduct.name}` : '#'} className="bg-[#0088FF] inline-block text-white px-8 py-3 font-bold text-sm hover:bg-blue-600 transition-colors">
                  LIAT DETAIL
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Categories */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-slate-900">Shop by Categories</h2>
            <Link href="/katalog" className="px-6 py-2 border border-slate-300 font-semibold text-sm hover:bg-slate-50 transition-colors">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard 
                key={cat.category || 'unknown'}
                title={cat.category || 'Lainnya'} 
                subtitle={`${cat._count.id} products`} 
                category={cat.category || ''}
              />
            ))}
          </div>
        </section>

        {/* New Products */}
        <section className="max-w-7xl mx-auto px-6 py-10 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">New Products</h2>
            <div className="flex flex-wrap justify-center gap-8 text-lg font-medium text-slate-800">
              <span className="border-b-2 border-slate-900 pb-1 cursor-pointer">All</span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-900">Chairs</span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-900">Tables</span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-900">Armchairs</span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-900">Sofas</span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-900">Decor</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-400 font-medium bg-slate-50 rounded-3xl">
                Belum ada produk yang tersedia.
              </div>
            )}
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group cursor-pointer">
                <div className="aspect-square bg-slate-50 flex items-center justify-center text-slate-400 relative overflow-hidden rounded-3xl border border-slate-100 mb-4 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-900/5 transition-all duration-500">
                  {p.images[0] ? (
                    <img 
                      src={p.images[0].url} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="text-[10px] font-bold uppercase tracking-widest">No Image</div>
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#070864] shadow-lg hover:scale-110 transition-transform">
                        <ShoppingCart className="w-5 h-5" />
                     </div>
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5" />
                     </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.category || 'Furniture'}</p>
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#0088FF] transition-colors line-clamp-1">{p.name}</h4>
                  <p className="text-base font-black text-[#070864]">Rp {p.price.toLocaleString('id-ID')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#D9EAFD] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Newsletter Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8 border-b border-blue-200 pb-16">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Berlangganan Newsletter Kami</h2>
              <h2 className="text-2xl font-bold text-slate-900">Jangan lewatkan berita dan promo terbaru</h2>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-72 px-4 py-3 bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#0088FF]"
              />
              <button className="bg-[#0088FF] text-white px-8 py-3 font-semibold hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-slate-900" />
                <span className="text-xl font-black text-slate-900 tracking-tight">OMAH.ID</span>
              </div>
              <p className="text-slate-600 text-sm">Jl.Telang Indah gg.II</p>
              <p className="text-slate-600 text-sm"><span className="font-semibold text-slate-900">Email:</span> Omah.id@gmail.co.id</p>
              <p className="text-slate-600 text-sm"><span className="font-semibold text-slate-900">Phone:</span> (928) 630-9272</p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6">BELANJA</h4>
              <ul className="space-y-3">
                <li><Link href="/katalog" className="text-slate-600 text-sm hover:text-slate-900">Katalog</Link></li>
                <li><Link href="/about" className="text-slate-600 text-sm hover:text-slate-900">Tentang Kami</Link></li>
                <li><Link href="/services" className="text-slate-600 text-sm hover:text-slate-900">Layanan</Link></li>
                <li><Link href="/payment" className="text-slate-600 text-sm hover:text-slate-900">Pembayaran</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Customer service</h4>
              <ul className="space-y-3">
                <li><Link href="/orders" className="text-slate-600 text-sm hover:text-slate-900">Pesanan</Link></li>
                <li><Link href="/services" className="text-slate-600 text-sm hover:text-slate-900">Layanan</Link></li>
                <li><Link href="/payment" className="text-slate-600 text-sm hover:text-slate-900">Pembayaran</Link></li>
                <li><Link href="/about" className="text-slate-600 text-sm hover:text-slate-900">Tentang Kami</Link></li>
                <li><Link href="#" className="text-slate-600 text-sm hover:text-slate-900">FAQ</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Delivery</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-slate-600 text-sm hover:text-slate-900">Orders</Link></li>
                <li><Link href="#" className="text-slate-600 text-sm hover:text-slate-900">Return</Link></li>
                <li><Link href="#" className="text-slate-600 text-sm hover:text-slate-900">Free Delivery</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-blue-200">
            <p className="text-slate-500 text-xs">© Copyright f Store 2024. Design by Figma.guru</p>
            <div className="flex items-center gap-3 text-slate-500">
              <CreditCard className="w-8 h-8" />
              <span className="font-bold text-xs border border-slate-400 px-1 rounded">VISA</span>
              <span className="font-bold text-xs border border-slate-400 px-1 rounded">MasterCard</span>
              <span className="font-bold text-xs border border-slate-400 px-1 rounded italic">PayPal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CategoryCard({ title, subtitle, category }: { title: string, subtitle: string, category: string }) {
  const getIcon = (cat: string) => {
    const safeCat = cat || ''
    const c = safeCat.toUpperCase()
    if (c.includes('SOFA')) return <Sofa className="w-10 h-10" />
    if (c.includes('TIDUR') || c.includes('KASUR')) return <Bed className="w-10 h-10" />
    if (c.includes('MEJA')) return <Utensils className="w-10 h-10" />
    if (c.includes('LAMPU')) return <Lamp className="w-10 h-10" />
    if (c.includes('RAK')) return <Box className="w-10 h-10" />
    if (c.includes('LEMARI')) return <LayoutGrid className="w-10 h-10" />
    if (c.includes('DEKORASI')) return <Frame className="w-10 h-10" />
    return <LayoutGrid className="w-10 h-10" />
  }

  return (
    <Link href={`/search?q=${category}`} className="group block">
      <div className="aspect-square border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 group-hover:shadow-xl group-hover:shadow-blue-900/5 group-hover:border-[#0088FF] transition-all bg-white mb-4">
        <div className="w-20 h-20 mb-4 bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center rounded-2xl text-slate-400 group-hover:text-[#0088FF] transition-colors">
          {getIcon(category)}
        </div>
      </div>
      <div className="px-2">
        <h3 className="font-bold text-slate-900 capitalize text-lg group-hover:text-[#0088FF] transition-colors">{(title || '').toLowerCase()}</h3>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
    </Link>
  )
}
