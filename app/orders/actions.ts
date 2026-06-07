'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function completeOrder(orderId: string) {
  const session = await getSession()
  if (!session?.user) {
    return { error: 'Unauthorized' }
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId }
  })

  if (!order || order.userId !== session.user.id) {
    return { error: 'Order not found' }
  }

  if (order.status !== 'SHIPPED') {
    return { error: 'Hanya pesanan yang sedang dikirim yang dapat dikonfirmasi.' }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'COMPLETED' }
  })

  revalidatePath('/orders')
  return { success: true }
}
