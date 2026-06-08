/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)

// Optional analytics origins, only allowlisted when GA is actually configured.
const gaScript = gaEnabled ? ['https://www.googletagmanager.com'] : []
const gaConnect = gaEnabled
  ? [
      'https://www.googletagmanager.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
    ]
  : []
const gaImg = gaEnabled ? ['https://www.google-analytics.com', 'https://www.googletagmanager.com'] : []

// Content-Security-Policy. Kept static (no per-request nonce) so pages stay
// statically rendered. 'unsafe-inline' is required for Next's hydration
// bootstrap and injected styles; the remaining directives lock down framing,
// plugins, base-uri, and form targets — the high-value protections.
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'self'`,
  `form-action 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${gaScript.join(' ')}`.trim(),
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${gaImg.join(' ')}`.trim(),
  `font-src 'self' data:`,
  `connect-src 'self' ${gaConnect.join(' ')}`.trim(),
  // Google Maps is embedded via an iframe on the locations page.
  `frame-src https://*.google.com`,
  `upgrade-insecure-requests`,
]
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // HSTS — Vercel already terminates TLS, but explicit header signals intent.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    const toOrthopedic = [
      'joint-replacement',
      'sports-medicine',
      'spine-care',
      'hand-wrist',
      'foot-ankle',
      'arthroscopic-surgery',
      'fracture-care',
    ].map((slug) => ({
      source: `/services/${slug}`,
      destination: '/services/orthopedic-services',
      permanent: true,
    }))

    return [
      ...toOrthopedic,
      {
        source: '/services/pain-management',
        destination: '/services/physical-therapy',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
