import { prisma } from '@/lib/prisma'
import { Eye, Edit, Trash2 } from 'lucide-react'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#070864] mb-1">Manajemen Pengguna</h3>
          <p className="text-sm text-slate-500">Daftar semua pengguna dan admin yang terdaftar.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">NAMA</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">EMAIL</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">ROLE</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm">BERGABUNG</th>
              <th className="py-4 px-4 font-bold text-slate-400 text-sm text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 text-sm font-bold text-[#070864]">{user.name || 'User'}</td>
                <td className="py-4 px-4 text-sm font-bold text-slate-700">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                    user.role === 'ADMIN' ? 'bg-[#070864] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-500">
                  {user.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 justify-center">
                    <button 
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                      title="Hapus Pengguna"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
