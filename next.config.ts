

// const nextConfig = {
//   images: {
//     // ✅ بيقبل أي domain خارجي من غير قيود
//     unoptimized: true,
//       remotePatterns: [
//      {
//       protocol: 'https',
//       hostname: '**.ngrok-free.dev',
//    },
//  ],
//   },
// }
 
// module.exports = nextConfig
 

// const nextConfig = {
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**.ngrok-free.dev',
//       },
//       {
//         protocol: 'https',
//         hostname: '**.trycloudflare.com', // ← Cloudflare Tunnel
//       },
//       {
//         protocol: 'https',
//         hostname: '**.cloudflare.com',
//       },
//     ],
//   },
//     experimental: {
//     serverActions: {
//       bodySizeLimit: '10mb',
//     },
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ngrok-free.dev',
      },
      {
        protocol: 'https',
        hostname: '**.trycloudflare.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }, 
}

module.exports = nextConfig