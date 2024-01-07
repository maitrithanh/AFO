import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const hostname = request.headers.get('host')

  // If on beta.example.com, redirect to example.com/beta
  if (hostname === 'beta.example.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'example.com'
    url.pathname = '/beta' + url.pathname
    return NextResponse.rewrite(url)
  }
}