'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                    process.env.SUPABASE_SERVICE_ROLE_KEY || 
                    process.env.SUPABASE_BUCKET_SECRET_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function createCustomOrder(formData: FormData): Promise<void> {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login?callbackUrl=/custom-order')
  }

  const productName = formData.get('productName') as string
  const description = formData.get('description') as string
  const materials = formData.get('materials') as string
  
  const pLength = formData.get('panjang') as string || ''
  const pWidth = formData.get('lebar') as string || ''
  const pHeight = formData.get('tinggi') as string || ''
  const dimensions = `${pLength} x ${pWidth} x ${pHeight} cm`
  
  const initialImageUrl = formData.get('initialImageUrl') as string

  // Process Images
  const imageFiles = formData.getAll('imageFiles') as File[]
  const finalImageUrls: string[] = []

  if (initialImageUrl) {
    finalImageUrls.push(initialImageUrl)
  }

  for (const file of imageFiles) {
    if (file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { error } = await supabase.storage.from('products').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

      if (!error) {
        const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName)
        finalImageUrls.push(publicUrlData.publicUrl)
      } else {
        console.error('Supabase upload error:', error)
      }
    }
  }

  if (!productName || !description) {
    // We cannot return an object to a form action without using useActionState (which requires client component)
    // For simplicity in server component form, we'll just redirect or handle error differently
    redirect('/custom-order?error=missing_fields')
  }

  // Generate unique ID like ORD-00124-C
  const count = await prisma.customOrder.count()
  const displayId = `ORD-${String(count + 1).padStart(5, '0')}-C`

  await prisma.customOrder.create({
    data: {
      displayId,
      productName,
      description,
      materials,
      dimensions,
      status: 'PENDING',
      userId: session.user.id,
      images: {
        create: finalImageUrls.map(url => ({ url }))
      }
    }
  })

  revalidatePath('/dashboard/custom-orders')
  revalidatePath('/orders')
  redirect('/orders')
}
