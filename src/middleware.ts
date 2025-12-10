import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
const supportedLocales = ['tr', 'en'] as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Language management
  const url = request.nextUrl.clone()
  const langParam = url.searchParams.get('lang')

  // 1. If URL has lang param, update cookie
  if (langParam && supportedLocales.includes(langParam as (typeof supportedLocales)[number])) {
    const response = NextResponse.next()
    response.cookies.set('language', langParam, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  }

  // 2. If cookie exists but different from lang param (implied default tr), functionality is handled by client I18nProvider
  // We keep this simple to avoid redirect loops or conflicts with client-side router

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
