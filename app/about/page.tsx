import Navbar from '@/components/Navbar'
import { Info, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#070864] mb-6">Tentang OMAH.ID</h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mx-auto">
            Kami adalah destinasi utama Anda untuk furniture berkualitas tinggi yang menggabungkan estetika modern dengan fungsionalitas yang tak lekang oleh waktu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-[#D9EAFD] p-10 rounded-3xl">
            <div className="w-12 h-12 bg-[#0088FF] rounded-2xl flex items-center justify-center text-white mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#070864] mb-4">Misi Kami</h3>
            <p className="text-slate-700 leading-relaxed">
              Mewujudkan hunian impian setiap keluarga Indonesia dengan menghadirkan produk furniture berkualitas, desain inovatif, dan harga yang kompetitif.
            </p>
          </div>
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-[#070864] rounded-2xl flex items-center justify-center text-white mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#070864] mb-4">Tim Kami</h3>
            <p className="text-slate-700 leading-relaxed">
              Didukung oleh pengrajin ahli dan desainer berpengalaman yang berdedikasi tinggi terhadap kualitas dan detail di setiap produk yang kami ciptakan.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <h2 className="text-3xl font-black text-[#070864] text-center">Kenapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0088FF] rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900">Kualitas Premium</h4>
              <p className="text-sm text-slate-500">Material pilihan terbaik untuk ketahanan produk jangka panjang.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0088FF] rounded-full flex items-center justify-center mx-auto">
                <Info className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900">Desain Eksklusif</h4>
              <p className="text-sm text-slate-500">Desain unik yang tidak akan Anda temukan di tempat lain.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0088FF] rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900">Layanan Personal</h4>
              <p className="text-sm text-slate-500">Kami membantu Anda memilih produk yang paling sesuai dengan kebutuhan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
