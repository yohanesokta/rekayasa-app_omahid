'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSuccess(true)
    setLoading(false)
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
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pemulihan Akses Admin</p>
        </div>

        {/* Reset Password Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-50/50"
        >
          <div className="flex flex-col items-center mb-8">
            <Link href="/login" title='Kembali' className="self-start p-2 -ml-2 rounded-full hover:bg-slate-50 transition-colors mb-2">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <h2 className="text-2xl font-bold text-[#070864] font-serif text-center mt-[-32px]">Reset Password</h2>
          </div>

          {!success ? (
            <>
              <p className="text-sm text-slate-500 text-center mb-8">
                Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-4 bg-[#070864] hover:bg-[#0a0c8a] text-white rounded-full font-bold shadow-lg shadow-[#070864]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Kirim Link Reset"}
                </button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#070864] mb-2">Cek Email Anda</h2>
                <p className="text-sm text-slate-500">
                  Kami telah mengirimkan link reset password ke <br/>
                  <strong className="text-slate-700">{email}</strong>
                </p>
              </div>
              <Link href="/login" className="block w-full py-4 mt-6 bg-slate-50 text-slate-700 rounded-full font-bold hover:bg-slate-100 transition-all border border-slate-200 text-sm">
                Kembali ke Login
              </Link>
            </motion.div>
          )}
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
