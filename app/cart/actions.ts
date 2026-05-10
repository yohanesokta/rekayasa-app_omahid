'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string) {
  const session = await getSession()
  if (!session?.user) return { error: 'Please login first' }

  let cart = await prisma.cart.findUnique({ where: { userId: session.user.id } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: session.user.id } })
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 }
    })
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 }
    })
  }

  revalidatePath('/cart')
  return { success: true }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const session = await getSession()
  if (!session?.user) return { error: 'Please login first' }

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } })
  } else {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    })
  }
  revalidatePath('/cart')
  return { success: true }
}

export async function removeCartItem(itemId: string) {
  const session = await getSession()
  if (!session?.user) return { error: 'Please login first' }

  await prisma.cartItem.delete({ where: { id: itemId } })
  revalidatePath('/cart')
  return { success: true }
}
