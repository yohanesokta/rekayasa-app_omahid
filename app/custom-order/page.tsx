import Navbar from '@/components/Navbar'
import { FileText, Package, Ruler, Image as ImageIcon, UploadCloud } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createCustomOrder } from './actions'
import SubmitButton from '@/components/SubmitButton'

export default async function CustomOrderPage({ searchParams }: { searchParams: Promise<{ productName?: string, imageUrl?: string }> }) {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login?callbackUrl=/custom-order')
  }

  const { productName: initialName, imageUrl: initialImageUrl } = await searchParams

  return (
    <div className="min-h-screen bg-[#EEF2FA]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#070864] mb-4">Custom Order Furniture</h1>
          <p className="text-slate-500 text-lg">Wujudkan furniture impian Anda dengan desain dan ukuran kustom.</p>
        </div>

        <form action={createCustomOrder} className="space-y-8">
          {/* Informasi Produk */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm">
            <h3 className="text-xl font-bold text-[#070864] mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" /> Detail Furniture
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Produk / Jenis Furniture <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="productName" 
                  required 
                  defaultValue={initialName}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium text-slate-900" 
                  placeholder="Contoh: Meja Makan Kayu Jati Minimalis" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Material yang Diinginkan</label>
                <input 
                  type="text" 
                  name="materials" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium text-slate-900" 
                  placeholder="Contoh: Kayu Jati, Besi Industrial, Kain Velvet" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Deskripsi & Spesifikasi Khusus <span className="text-red-500">*</span></label>
                <textarea 
                  name="description" 
                  required 
                  rows={5} 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium text-slate-900 resize-none" 
                  placeholder="Jelaskan detail desain, warna, atau instruksi khusus lainnya..." 
                />
              </div>
            </div>
          </div>

          {/* Dimensi & Foto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm">
              <h3 className="text-xl font-bold text-[#070864] mb-6 flex items-center gap-2">
                <Ruler className="w-6 h-6" /> Dimensi (cm)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center block">Panjang</label>
                  <input type="number" name="panjang" className="w-full text-center px-2 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium" placeholder="P" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center block">Lebar</label>
                  <input type="number" name="lebar" className="w-full text-center px-2 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium" placeholder="L" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center block">Tinggi</label>
                  <input type="number" name="tinggi" className="w-full text-center px-2 py-3 rounded-xl border-2 border-slate-100 focus:border-[#0088FF] outline-none transition-all text-sm font-medium" placeholder="T" />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 italic">* Kosongkan jika ingin dikonsultasikan lebih lanjut.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm">
              <h3 className="text-xl font-bold text-[#070864] mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6" /> Referensi Desain
              </h3>

              {initialImageUrl && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Produk Referensi:</p>
                  <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200">
                    <img src={initialImageUrl} alt="Referensi" className="w-full h-full object-cover" />
                  </div>
                  <input type="hidden" name="initialImageUrl" value={initialImageUrl} />
                </div>
              )}

              <label className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#0088FF] bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-all">
                <input type="file" name="imageFiles" accept="image/*" multiple className="hidden" />
                <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center px-4">Upload Gambar Referensi</span>
                <span className="text-[10px] text-slate-400 mt-1">Bisa pilih lebih dari 1 gambar</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <SubmitButton className="bg-[#070864] hover:bg-[#0088FF] text-white px-12 py-4 rounded-2xl font-black tracking-widest transition-all shadow-xl shadow-[#070864]/20 flex items-center gap-3">
              KIRIM PERMINTAAN KUSTOM
            </SubmitButton>
          </div>
        </form>

        <div className="mt-16 bg-blue-50 p-8 rounded-[32px] border border-blue-100">
          <h4 className="font-bold text-[#070864] mb-2 flex items-center gap-2">
             <Package className="w-5 h-5" /> Apa yang terjadi selanjutnya?
          </h4>
          <ul className="text-sm text-slate-600 space-y-2 list-disc ml-5">
            <li>Tim kami akan meninjau permintaan Anda dalam 1-2 hari kerja.</li>
            <li>Kami akan menghubungi Anda untuk detail spesifikasi dan memberikan estimasi harga.</li>
            <li>Setelah harga disepakati, Anda dapat melakukan pembayaran untuk memulai proses produksi.</li>
            <li>Anda dapat memantau status pesanan di halaman "Pesanan Saya".</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
