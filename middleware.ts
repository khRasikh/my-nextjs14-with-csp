import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
 requestHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()')
 requestHeaders.set('X-Content-Type-Options', 'nosniff')
 requestHeaders.set('Referrer-Policy', 'origin-when-cross-origin')

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  requestHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()')
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('Referrer-Policy', 'origin-when-cross-origin')
  return response
}