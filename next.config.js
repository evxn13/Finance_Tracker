/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions sont activés par défaut dans Next.js 14
  
  // Optimisations SEO et Performance
  compress: true,
  poweredByHeader: false,
  
  // Optimisation des polices (réduit render-blocking)
  optimizeFonts: true,
  
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Redirections SEO
  async redirects() {
    return [
      // Ajoutez vos redirections ici si nécessaire
    ];
  },
}

module.exports = nextConfig
