import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function UserOrdersPage() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: { include: { product: { include: { images: true } } } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen font-sans text-slate-900" style={{ background: '#EEF2FA' }}>
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-[#070864] mb-8">Daftar Pesanan Saya</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-400 mb-4">Anda belum memiliki pesanan</h2>
            <Link href="/search" className="inline-block bg-[#070864] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0088FF] transition-all">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-[24px] p-6 shadow-sm">
                <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-4 mb-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 font-bold mb-1">ID Pesanan</p>
                    <p className="font-mono text-[#070864] font-bold text-sm">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold mb-1">Tanggal</p>
                    <p className="text-sm text-slate-700 font-bold">{order.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold mb-1">Total Belanja</p>
                    <p className="font-black text-green-600">Rp {order.totalAmount.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                      order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                      order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'PROCESSING' ? 'bg-purple-100 text-purple-700' :
                      order.status === 'SHIPPED' ? 'bg-indigo-100 text-indigo-700' :
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        {item.product.images[0]?.url ? (
                          <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex justify-center items-center text-[10px] text-slate-300">Img</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`} className="font-bold text-[#070864] hover:text-[#0088FF] line-clamp-1 transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-slate-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(order.trackingNumber || order.status === 'PENDING') && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    {order.trackingNumber && (
                      <div>
                        <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">Resi Pengiriman</p>
                        <p className="font-mono text-slate-800 font-bold">{order.trackingNumber}</p>
                      </div>
                    )}
                    {order.status === 'PENDING' && order.paymentUrl && (
                      <a href={order.paymentUrl} className="bg-[#070864] hover:bg-[#0088FF] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all ml-auto">
                        LANJUTKAN PEMBAYARAN
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
