import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, customNotes } = await req.json();
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItemsData = [];
    
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 });
      }
      
      const price = product.price;
      const quantity = item.quantity || 1;
      totalAmount += price * quantity;
      
      orderItemsData.push({
        productId: product.id,
        quantity: quantity,
        price: price,
        customOptions: item.customOptions || null,
      });
    }

    // Create Order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'PENDING',
        totalAmount,
        customNotes,
        items: {
          create: orderItemsData,
        }
      }
    });

    // Call Midtrans API
    const authString = Buffer.from(process.env.PAY_Server_Key + ':').toString('base64');
    const midtransResponse = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: order.id,
          gross_amount: totalAmount
        },
        customer_details: {
          first_name: session.user.name || 'User',
          email: session.user.email
        }
      })
    });

    const midtransData = await midtransResponse.json();
    
    if (!midtransResponse.ok) {
      console.error('Midtrans Error:', midtransData);
      return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
    }

    // Update order with paymentUrl
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: midtransData.redirect_url }
    });
    
    // If these items were from the cart, clear them from the cart
    const userCart = await prisma.cart.findUnique({ where: { userId: session.user.id } });
    if (userCart) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
          productId: { in: items.map((i: any) => i.productId) }
        }
      });
    }

    return NextResponse.json({ 
      orderId: order.id, 
      paymentUrl: midtransData.redirect_url,
      token: midtransData.token
    });
    
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
