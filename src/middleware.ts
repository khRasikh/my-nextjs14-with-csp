import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// CSP Implementation
export function middleware(request: NextRequest) {
  // this is needed because when passing throught this middleware the microsoft auth does not redirect properly and throws lot of errors
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const CSPDirectivesForRequestResponse = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "geolocation=(self)" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
  ];

  const DirectivesForCSP = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://alcdn.msauth.net;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.googleapis.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://login.microsoftonline.com https://graph.microsoft.com/v1.0/me;
    report-uri /api/csp;
    frame-src 'self';
    worker-src 'self';
    sandbox allow-forms allow-same-origin allow-scripts;
  `;
  // Replace newline characters and spaces
  const CSPHeades = DirectivesForCSP.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);

  let CSPReportOnlyActivation = process.env.NEXT_PUBLIC_CSP_REPORT_ONLY_ACTIVATION ?? true; //default = true
  let CSPHeadersName = CSPReportOnlyActivation ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";

  // Request Headers CSP
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(CSPHeadersName, CSPHeades);
  CSPDirectivesForRequestResponse.forEach(({ key, value }) => {
    requestHeaders.set(key, value);
  });

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Response Headers CSP
  response.headers.set(CSPHeadersName, CSPHeades);
  CSPDirectivesForRequestResponse.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });

  return response;
}
