'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'terbaru'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value === 'terbaru') {
      params.delete('sort')
    } else {
      params.set('sort', e.target.value)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Urutkan:</span>
      <select 
        value={currentSort} 
        onChange={handleSortChange}
        className="bg-transparent text-[13px] font-bold text-[#070864] outline-none cursor-pointer appearance-none hover:bg-slate-50 p-1 px-2 rounded-md transition-colors"
      >
        <option value="terbaru">Terbaru</option>
        <option value="terlama">Terlama</option>
        <option value="harga-tertinggi">Harga Tertinggi</option>
        <option value="harga-terendah">Harga Terendah</option>
        <option value="stok-terbanyak">Stok Terbanyak</option>
        <option value="stok-sedikit">Stok Sedikit</option>
      </select>
    </div>
  )
}
