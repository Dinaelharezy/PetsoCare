// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['kyree-thatchy-janey.ngrok-free.dev'],
//   },

// };

// module.exports = nextConfig
// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyree-thatchy-janey.ngrok-free.dev',
      }
    ]
  }
}

module.exports = nextConfig