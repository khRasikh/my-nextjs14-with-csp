import { headers } from 'next/headers'
import Script from 'next/script'
 
export default function ExternalScript() {
  const nonce = headers().get('x-nonce') ?? ""
 
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}