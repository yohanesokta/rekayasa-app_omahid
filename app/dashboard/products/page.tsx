import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import SubmitButton from '@/components/SubmitButton'
import ProductSort from './ProductSort'

export const dynamic = 'force-dynamic'

export default async function AdminProductsList(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : 'semua'
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'terbaru'
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const ITEMS_PER_PAGE = 4

  let whereClause: any = {}
  if (tab === 'tersedia') {
    whereClause.stock = { gt: 0 }
  } else if (tab === 'habis') {
    whereClause.stock = { equals: 0 }
  }

  let orderByClause: any = { createdAt: 'desc' }
  if (sort === 'terlama') orderByClause = { createdAt: 'asc' }
  else if (sort === 'harga-tertinggi') orderByClause = { price: 'desc' }
  else if (sort === 'harga-terendah') orderByClause = { price: 'asc' }
  else if (sort === 'stok-terbanyak') orderByClause = { stock: 'desc' }
  else if (sort === 'stok-sedikit') orderByClause = { stock: 'asc' }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    include: { images: true }
  })

  const totalFilteredProducts = await prisma.product.count({ where: whereClause })
  const totalPages = Math.max(1, Math.ceil(totalFilteredProducts / ITEMS_PER_PAGE))

  const totalKatalog = await prisma.product.count()
  const stokRendah = await prisma.product.count({ where: { stock: { lt: 10 } } })
  const productsForCategories = await prisma.product.findMany({ select: { category: true }, distinct: ['category'] })
  const kategoriAktif = productsForCategories.filter(p => p.category).length
  const allProductsForInventory = await prisma.product.findMany({ select: { price: true, stock: true } })
  const nilaiInventaris = allProductsForInventory.reduce((acc, p) => acc + (p.price * p.stock), 0)

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(1)}B`
    }
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(1)}M`
    }
    return `Rp ${val.toLocaleString('id-ID')}`
  }

  async function deleteProduct(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    if (id) {
      await prisma.product.delete({ where: { id } })
      revalidatePath('/dashboard/products')
    }
  }

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams()
    if (tab !== 'semua') params.set('tab', tab)
    if (sort !== 'terbaru') params.set('sort', sort)
    if (page !== 1) params.set('page', page.toString())
    
    if (value === null) {
      params.delete(name)
    } else {
      params.set(name, value)
    }
    
    if (name === 'tab') {
      params.delete('page')
    }
    
    const query = params.toString()
    return query ? `?${query}` : '?'
  }

  const activeTabClass = "px-6 py-2.5 bg-blue-100/50 text-[#070864] rounded-full text-[13px] font-bold inline-block"
  const inactiveTabClass = "px-6 py-2.5 text-slate-500 hover:text-slate-700 rounded-full text-[13px] font-medium transition-colors inline-block"

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-[32px] font-bold text-[#070864] font-serif leading-tight">Daftar Produk</h3>
          <p className="text-slate-600 text-sm mt-1">Kelola katalog furnitur eksklusif OMAH.ID dengan presisi arsitektural.</p>
        </div>
        <Link href="/dashboard/products/add" className="flex items-center gap-2 bg-[#070864] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-900 shadow-lg shadow-blue-900/20 transition-all">
          <Plus className="w-5 h-5" /> Tambah Produk
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Total Katalog</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-slate-800">{totalKatalog.toLocaleString('id-ID')}</span>
            <span className="text-[10px] font-bold text-[#070864]">+12 Bulan ini</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Stok Rendah</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-red-600">{stokRendah}</span>
            <span className="text-[10px] text-slate-500 font-medium">Perlu Restock</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kategori Aktif</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-slate-800">{kategoriAktif}</span>
            <span className="text-[10px] text-slate-500 font-medium">Arsitektural</span>
          </div>
        </div>
        <div className="bg-[#2A4B8C] rounded-3xl p-6 shadow-sm flex flex-col justify-center text-white">
          <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-2">Nilai Inventaris</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold">{formatCurrency(nilaiInventaris)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100/50">
            <Link href={createQueryString('tab', 'semua')} scroll={false} className={tab === 'semua' ? activeTabClass : inactiveTabClass}>Semua Produk</Link>
            <Link href={createQueryString('tab', 'tersedia')} scroll={false} className={tab === 'tersedia' ? activeTabClass : inactiveTabClass}>Tersedia</Link>
            <Link href={createQueryString('tab', 'habis')} scroll={false} className={tab === 'habis' ? activeTabClass : inactiveTabClass}>Habis</Link>
          </div>
          <ProductSort />
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-slate-600 border-collapse">
            <thead className="text-slate-400 font-bold border-b-2 border-slate-50 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-2 py-4 w-[40%]">Produk</th>
                <th className="px-2 py-4 w-[20%]">Kategori</th>
                <th className="px-2 py-4 w-[20%]">Harga</th>
                <th className="px-2 py-4 text-center w-[10%]">Stok</th>
                <th className="px-2 py-4 text-right w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400">Belum ada produk untuk filter ini.</td>
                </tr>
              )}
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-2 py-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-400 font-medium">No Img</div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[14px]">{p.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">SKU: OMAH-{p.id.slice(-6)}</p>
                    </div>
                  </td>
                  <td className="px-2 py-5 font-bold text-slate-600">
                    <span className="bg-slate-100/80 text-slate-600 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {p.category || 'UNTAGGED'}
                    </span>
                  </td>
                  <td className="px-2 py-5 font-medium text-slate-700">
                    Rp {p.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-2 py-5 font-bold text-center">
                    <span className={`${p.stock > 10 ? 'text-slate-800' : p.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-2 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/products/${p.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <SubmitButton 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          icon={<Trash2 className="w-4 h-4" />}
                        >
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
          <p className="text-[12px] text-slate-500 font-medium">
            Menampilkan {totalFilteredProducts === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(page * ITEMS_PER_PAGE, totalFilteredProducts)} dari {totalFilteredProducts} produk
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              {page > 1 ? (
                <Link href={createQueryString('page', (page - 1).toString())} scroll={false} className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= page - 1 && pageNumber <= page + 1)
                ) {
                  return (
                    <Link
                      key={pageNumber}
                      href={createQueryString('page', pageNumber.toString())}
                      scroll={false}
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-[12px] transition-colors ${
                        page === pageNumber 
                          ? 'bg-[#070864] text-white' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  )
                } else if (
                  pageNumber === page - 2 || 
                  pageNumber === page + 2
                ) {
                  return <span key={pageNumber} className="text-slate-400 text-xs">...</span>
                }
                return null;
              })}

              {page < totalPages ? (
                <Link href={createQueryString('page', (page + 1).toString())} scroll={false} className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
