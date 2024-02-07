/** @type {import('next').NextConfig} */
const CSPHeaders = `default-src *; script-src 'unsafe-inline' 'unsafe-eval' 'self' https://alcdn.msauth.net; 
                style-src 'self' https://fonts.googleapis.com; object-src 'none'; base-uri 'self'; 
                connect-src 'self' https://login.microsoftonline.com https://graph.microsoft.com/v1.0/me; 
                font-src 'self' https://fonts.googleapis.com; frame-src 'self'; img-src 'self'; 
                form-action 'self';`

const nextConfig = {
    // async headers() {
    //   return [
    //       {
    //         source: '/(.*)',
    //         headers: [
    //           {
    //             key: 'Content-Security-Policy',
    //             value: CSPHeaders
    //           },
    //           {
    //             key: 'X-Frame-Options',
    //             value: 'DENY',
    //           },
    //           {
    //             key: 'X-Content-Type-Options',
    //             value: 'nosniff',
    //           },
    //           {
    //             key: 'Referrer-Policy',
    //             value: 'origin-when-cross-origin',
    //           },
    //           {
    //             key: 'Permissions-Policy',
    //             value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')",
    //           },
    //         ],
    //       },
    //     ];
    // },
  };
  

export default nextConfig;
