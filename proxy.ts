import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './lib/auth'

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      await decrypt(session)
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect from login/register if already logged in
  if (pathname === '/login' || pathname === '/register') {
    if (session) {
      try {
        await decrypt(session)
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } catch (e) {
        // Token invalid, allow access to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
