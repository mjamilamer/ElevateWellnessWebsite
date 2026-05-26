/** @type {import('next').NextConfig} */
const securityHeaders = [
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
