import Navbar from '@/components/Navbar'
import { CreditCard, Smartphone, Building2, ShieldCheck } from 'lucide-react'

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#070864] mb-6">Metode Pembayaran</h1>
          <p className="text-slate-500 text-lg">Kemudahan dan keamanan transaksi Anda adalah prioritas kami.</p>
        </div>

        <div className="space-y-12">
          {/* Virtual Accounts */}
          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="w-8 h-8 text-[#070864]" />
              <h2 className="text-2xl font-bold text-[#070864]">Transfer Bank (Virtual Account)</h2>
            </div>
            <p className="text-slate-600 mb-6">Metode paling populer dengan verifikasi otomatis secara real-time.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <BankLogo name="BCA" />
              <BankLogo name="Mandiri" />
              <BankLogo name="BNI" />
              <BankLogo name="BRI" />
            </div>
          </section>

          {/* E-Wallet */}
          <section className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <Smartphone className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-slate-900">E-Wallet & QRIS</h2>
            </div>
            <p className="text-slate-600 mb-6">Bayar lebih cepat menggunakan scan QRIS atau dompet digital favorit Anda.</p>
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500">GoPay</span>
              <span className="px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500">OVO</span>
              <span className="px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500">ShopeePay</span>
              <span className="px-6 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500">QRIS</span>
            </div>
          </section>

          {/* Credit Card */}
          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Kartu Kredit</h2>
            </div>
            <p className="text-slate-600 mb-6">Mendukung kartu berlogo VISA, MasterCard, dan JCB dengan opsi cicilan 0%.</p>
          </section>

          {/* Security Note */}
          <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-green-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-green-900 mb-1">Transaksi Aman & Terenkripsi</h4>
              <p className="text-sm text-green-700">Semua data transaksi Anda dilindungi dengan enkripsi SSL standar industri. Kami bekerja sama dengan Midtrans sebagai payment gateway resmi.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function BankLogo({ name }: { name: string }) {
  return (
    <div className="bg-white h-16 border border-slate-200 rounded-xl flex items-center justify-center font-black text-slate-400">
      {name}
    </div>
  )
}
