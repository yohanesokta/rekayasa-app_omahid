'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push('/login?message=Account created successfully')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[#F7F9FD] overflow-hidden font-sans">
      {/* Soft Blurred Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#070864] tracking-tight mb-2">OMAH.ID</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pendaftaran Akses Admin</p>
        </div>

        {/* Register Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-50/50"
        >
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl font-bold text-[#070864] font-serif">Daftar Akun Baru</h2>
            <p className="text-sm text-slate-500">Silakan isi data untuk Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-slate-200 bg-white focus:border-[#070864] focus:ring-1 focus:ring-[#070864] outline-none transition-all placeholder:text-slate-400 text-sm font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin@omah.id"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-slate-200 bg-white focus:border-[#070864] focus:ring-1 focus:ring-[#070864] outline-none transition-all placeholder:text-slate-400 text-sm font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-slate-200 bg-white focus:border-[#070864] focus:ring-1 focus:ring-[#070864] outline-none transition-all placeholder:text-slate-400 text-sm font-medium text-slate-700 tracking-widest"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-[#070864] hover:bg-[#0a0c8a] text-white rounded-full font-bold shadow-lg shadow-[#070864]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm tracking-wide"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Daftar"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/login" className="text-xs font-semibold text-slate-500 hover:text-[#070864] transition-colors">
              Sudah punya akun? <span className="text-[#070864]">Masuk</span>
            </Link>
          </div>
        </motion.div>

        {/* Decorative Dots below card */}
        <div className="flex gap-4 mt-8">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          © 2026 OMAH.ID ADMIN DASHBOARD
        </p>
      </div>
    </div>
  )
}
