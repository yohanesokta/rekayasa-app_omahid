import Navbar from '@/components/Navbar'
import { Truck, ShieldCheck, PenTool, Headphones } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#070864] mb-6">Layanan Kami</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Di OMAH.ID, kami tidak hanya menjual furniture. Kami memberikan solusi lengkap untuk kenyamanan hunian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard 
            icon={<Truck className="w-8 h-8" />}
            title="Pengiriman Seluruh Indonesia"
            description="Layanan pengiriman aman dan terpercaya ke seluruh penjuru Indonesia dengan packing standar ekspor."
            color="bg-blue-50 text-blue-600"
          />
          <ServiceCard 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Garansi Kualitas"
            description="Setiap produk kami dilengkapi dengan garansi struktur dan material untuk menjamin kepuasan Anda."
            color="bg-green-50 text-green-600"
          />
          <Link href="/custom-order" className="block">
            <ServiceCard 
              icon={<PenTool className="w-8 h-8" />}
              title="Custom Order Furniture"
              description="Ingin furniture dengan desain sendiri? Kami melayani pembuatan produk kustom sesuai spesifikasi Anda."
              color="bg-purple-50 text-purple-600"
            />
          </Link>
          <ServiceCard 
            icon={<Headphones className="w-8 h-8" />}
            title="Konsultasi Gratis"
            description="Bingung memilih furniture? Konsultasikan penataan ruang Anda dengan tim interior kami secara gratis."
            color="bg-orange-50 text-orange-600"
          />
        </div>

        <div className="mt-24 bg-[#070864] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Siap Mempercantik Rumah Anda?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">Hubungi tim kami sekarang untuk penawaran terbaik atau mulai belanja di katalog kami.</p>
          <div className="flex justify-center gap-4">
            <a href="/katalog" className="bg-[#0088FF] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">Lihat Katalog</a>
            <a href="/about" className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all">Tentang Kami</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function ServiceCard({ icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  )
}
