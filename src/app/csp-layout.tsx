import { headers } from 'next/headers'
import Script from 'next/script'
 
export default function Page() {
  const nonce = headers().get('x-nonce') ?? ""
 
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  )
}