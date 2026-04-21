'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Package, Users, Settings, User } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          throw new Error('Not authenticated')
        }
        const data = await res.json()
        setUser(data.user)
      } catch (e) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FD]">
        <div className="w-8 h-8 border-4 border-[#070864] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FD] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#070864] text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tight">OMAH.ID</h1>
          <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-200 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
            <Package className="w-5 h-5" /> Produk
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-200 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
            <Users className="w-5 h-5" /> Pelanggan
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-200 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
            <Settings className="w-5 h-5" /> Pengaturan
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-blue-900/50 p-4 rounded-xl mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-[10px] text-blue-300 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="inline-block px-2 py-0.5 bg-blue-500/30 rounded text-[10px] font-bold text-blue-200 uppercase tracking-wider">
              {user?.role}
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#070864] font-serif">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-[#0088FF] hover:underline">
              Lihat Website
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-auto">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Selamat Datang, {user?.name}!</h3>
            <p className="text-slate-500 text-sm">
              Ini adalah tampilan awal dashboard admin. Anda berhasil login ke sistem menggunakan token JWT.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Stat Cards */}
              <div className="bg-[#F7F9FD] p-6 rounded-2xl border border-blue-50">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Produk</p>
                <p className="text-3xl font-black text-[#070864]">0</p>
              </div>
              <div className="bg-[#F7F9FD] p-6 rounded-2xl border border-blue-50">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Pesanan Baru</p>
                <p className="text-3xl font-black text-[#070864]">0</p>
              </div>
              <div className="bg-[#F7F9FD] p-6 rounded-2xl border border-blue-50">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Pendapatan</p>
                <p className="text-3xl font-black text-[#070864]">Rp 0</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
