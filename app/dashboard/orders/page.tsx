import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      _count: { select: { items: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#070864] mb-1">Daftar Pesanan</h3>
          <p className="text-sm text-slate-500">Kelola semua transaksi pengguna di sini.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">ID PESANAN</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">PELANGGAN</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">TANGGAL</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">TOTAL</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">STATUS</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-mono text-sm font-bold text-slate-700">{order.id.slice(-8)}</td>
                <td className="py-4 px-4 text-sm font-bold text-[#070864]">{order.user.name || order.user.email}</td>
                <td className="py-4 px-4 text-sm text-slate-500">
                  {order.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="py-4 px-4 text-sm font-black text-green-600">Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'PROCESSING' ? 'bg-purple-100 text-purple-700' :
                    order.status === 'SHIPPED' ? 'bg-indigo-100 text-indigo-700' :
                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 justify-center">
                    <Link 
                      href={`/dashboard/orders/${order.id}`}
                      className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
