import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Verify signature
    const signatureKey = crypto.createHash('sha512')
      .update(data.order_id + data.status_code + data.gross_amount + process.env.PAY_Server_Key)
      .digest('hex');
      
    if (signatureKey !== data.signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const { order_id, transaction_status, fraud_status } = data;

    let newStatus = 'PENDING';

    if (transaction_status == 'capture') {
      if (fraud_status == 'challenge') {
        newStatus = 'PENDING';
      } else if (fraud_status == 'accept') {
        newStatus = 'PAID';
      }
    } else if (transaction_status == 'settlement') {
      newStatus = 'PAID';
    } else if (transaction_status == 'cancel' ||
      transaction_status == 'deny' ||
      transaction_status == 'expire') {
      newStatus = 'CANCELED';
    } else if (transaction_status == 'pending') {
      newStatus = 'PENDING';
    }

    await prisma.order.update({
      where: { id: order_id },
      data: { status: newStatus as any }
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
