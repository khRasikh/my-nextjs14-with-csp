import { headers } from "next/headers";
import Script from "next/script";

export default function Page() {
  const nonce = headers().get("x-nonce") ?? "";

  return <Script src="https://my-nextjs14-with-csp.vercel.app/" strategy="afterInteractive" nonce={nonce} />;
}