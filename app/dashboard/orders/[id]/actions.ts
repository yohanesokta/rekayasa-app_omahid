'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, status: any, trackingNumber: string) {
  const session = await getSession()
  if (session?.user?.role !== 'ADMIN') {
    return { error: 'Unauthorized' }
  }

  // Requirement 3: Mandatory tracking number for SHIPPED status
  if (status === 'SHIPPED' && (!trackingNumber || trackingNumber.trim() === '')) {
    return { error: 'Nomor resi wajib diisi untuk status Pengiriman.' }
  }

  // Requirement 4: Admin cannot set status to COMPLETED
  if (status === 'COMPLETED') {
    return { error: 'Admin tidak dapat mengubah status menjadi Diterima secara manual. Hanya pembeli yang dapat mengonfirmasi penerimaan pesanan.' }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      trackingNumber: trackingNumber || null
    }
  })

  revalidatePath('/dashboard/orders')
  revalidatePath(`/dashboard/orders/${orderId}`)
  return { success: true }
}

export async function addShipmentUpdate(orderId: string, location: string, status: string) {
  const session = await getSession()
  if (session?.user?.role !== 'ADMIN') {
    return { error: 'Unauthorized' }
  }

  await prisma.shipmentUpdate.create({
    data: {
      orderId,
      location,
      status
    }
  })

  revalidatePath(`/dashboard/orders/${orderId}`)
  revalidatePath('/orders')
  return { success: true }
}
