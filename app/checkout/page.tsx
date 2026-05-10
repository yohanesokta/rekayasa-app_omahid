import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const { productId } = await searchParams
  let itemsToCheckout = []

  if (productId) {
    // Buy Now flow
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true }
    })
    if (!product) redirect('/search')
    itemsToCheckout.push({
      id: 'direct',
      productId: product.id,
      quantity: 1,
      product: product
    })
  } else {
    // Cart flow
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: { include: { product: { include: { images: true } } } }
      }
    })
    if (!cart || cart.items.length === 0) {
      redirect('/cart')
    }
    itemsToCheckout = cart.items
  }

  return (
    <div className="min-h-screen font-sans text-slate-900" style={{ background: '#EEF2FA' }}>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-[#070864] mb-8">Checkout</h1>
        <CheckoutClient items={itemsToCheckout} />
      </main>
    </div>
  )
}
