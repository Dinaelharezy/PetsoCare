// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['kyree-thatchy-janey.ngrok-free.dev'],
//   },

// };

// module.exports = nextConfig
// export default nextConfig;


/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**.trycloudflare.com"
//       }
//     ]
//   }
// }

// module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       // ✅ ngrok
//       {
//         protocol: "https",
//         hostname: "**.ngrok-free.app",
//       },
//       {
//         protocol: "https",
//         hostname: "**.ngrok.io",
//       },
//       // ✅ cloudflare (كان عندك)
//       {
//         protocol: "https",
//         hostname: "**.trycloudflare.com",
//       },
//       // ✅ أي domain تاني للـ backend
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// }

// module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**.ngrok-free.dev",
//       },
//       {
//         protocol: "https",
//         hostname: "**.ngrok-free.app",
//       },
//       {
//         protocol: "https",
//         hostname: "**.ngrok.io",
//       },
//       {
//         protocol: "https",
//         hostname: "**.trycloudflare.com",
//       },
//     ],
//   },
// }

// module.exports = nextConfig

const nextConfig = {
  images: {
    // ✅ بيقبل أي domain خارجي من غير قيود
    unoptimized: true,
  },
}
 
module.exports = nextConfig
 