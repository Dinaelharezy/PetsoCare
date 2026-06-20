

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
        hostname: '**.azurewebsites.net',
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
  eslint: {
   
    ignoreDuringBuilds: true,
  },
   typescript: {
  
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig