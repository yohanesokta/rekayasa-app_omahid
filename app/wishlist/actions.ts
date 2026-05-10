'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function toggleWishlist(productId: string) {
  const session = await getSession()
  if (!session?.user) return { error: 'Please login first' }

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: { userId: session.user.id, productId }
    }
  })

  if (existing) {
    await prisma.wishlist.delete({
      where: { id: existing.id }
    })
  } else {
    await prisma.wishlist.create({
      data: { userId: session.user.id, productId }
    })
  }

  revalidatePath('/wishlist')
  return { success: true }
}
