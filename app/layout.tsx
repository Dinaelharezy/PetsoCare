// import 'bootstrap/dist/css/bootstrap.min.css';
// import type { Metadata } from "next";
// import { Geist, Geist_Mono,Comfortaa,Amiri  } from "next/font/google";
// import "./globals.css";
// import  NavBar  from '../components/NavBar'
// import Footer from '../components/Footer'
// import { SessionProvider } from "next-auth/react";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const amiri = Amiri({
//   subsets: ['arabic', 'latin'],
//   weight: ['400', '700'],
//   variable: '--font-amiri'
// })

// const comfortaa = Comfortaa({ 
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-comfortaa'
// })


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


// export const metadata: Metadata = {
//   title: "PetsoCare",
//   description: "Your trusted pet care companion. Book appointments, find clinics, and access pet care resources all in one place.",
// };


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${comfortaa.variable} ${amiri.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//          <SessionProvider>
//           <NavBar />
//           {children}
//           <Footer />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa, Amiri } from "next/font/google";
import "./globals.css";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Providers from '../components/Providers'  // ✅ استخدم Providers بدل SessionProvider
import Chatbot from '../components/chatbot';
import 'leaflet/dist/leaflet.css'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const amiri = Amiri({ subsets: ['arabic', 'latin'], weight: ['400', '700'], variable: '--font-amiri' });
const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-comfortaa' });

export const metadata: Metadata = {
  title: "PetsoCare",
  description: "Your trusted pet care companion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${amiri.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>       {/* ✅ Client Component بيلف كل حاجة */}
          <NavBar />
          {children}
          <Chatbot />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}