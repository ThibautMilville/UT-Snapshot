import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en', 'de']
const defaultLocale = 'fr'

function getLocale(request: NextRequest): string {
  // Essayer de détecter la locale depuis les headers
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase()
    
    if (locales.includes(preferredLocale)) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignorer les routes qui ont déjà une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Rediriger seulement si aucune locale n'est présente et que ce n'est pas la racine
  if (pathname !== '/') {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclure les fichiers statiques et les API routes
    '/((?!api|_next/static|_next/image|favicon.ico|logo-ut.png|ultra.png).*)',
  ],
} 