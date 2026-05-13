
// import { auth } from "./lib/auth"; // ✅ import من auth.ts بتاعك
// import { NextRequest, NextResponse } from "next/server";

// const ROUTE_ROLES: Record<string, string[]> = {
//   "/admin":  ["Admin"],
//   "/clinic": ["Admin", "Clinic"],
// };

// const PUBLIC_PATHS = [
//   "/login",
//   "/SignUpCompletion",
//   "/main",
//   "/api/auth",
//   "/_next",
//   "/favicon.ico",
//   "/Images",
// ];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map|json|txt|woff|woff2|ttf|avif)$/)) {
//     return NextResponse.next();
//   }

//   if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
//     return NextResponse.next();
//   }

//   // ✅ بدل getToken
//   const session = await auth();

//   console.log("🔍 SESSION:", JSON.stringify(session, null, 2));

// if (!session?.user) {
//   const loginUrl = new URL("/login", req.url);
//   loginUrl.searchParams.set("callbackUrl", pathname);
//   return NextResponse.redirect(loginUrl); 

// }
 
// const userRole = (session.user.role as string) ?? "User";

//   console.log("👤 ROLE:", userRole);

//   for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
//     if (pathname.startsWith(route)) {
//       const hasAccess = allowed.includes(userRole);
//       if (!hasAccess) {
//         return NextResponse.redirect(new URL("/forbidden", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
//   ],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const ROUTE_ROLES: Record<string, string[]> = {
//   "/admin":  ["Admin"],
//   "/clinic": ["Admin", "Clinic"],
// };


// const PUBLIC_PATHS = [
//   "/login",
//   "/SignUpCompletion", 
//   "/main",
//   "/forgot-password",
//   "/reset-password",
//   "/verify-email",
//   "/_next",
//   "/auth",
//   "/favicon.ico",
//   "/Images",
//   "/api",  
// ]

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // ✅ تجاهل الملفات الثابتة
//   if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map|json|txt|woff|woff2|ttf|avif)$/)) {
//     return NextResponse.next();
//   }

//   // ✅ تجاهل الـ public paths
//   if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
//     return NextResponse.next();
//   }

//   // ✅ getToken بيشتغل في Edge Runtime
//   const token = await getToken({
//     req,
//     // secret: process.env.AUTH_SECRET,
//     secret: process.env.AUTH_SECRET,
//   });
// console.log("TOKEN:", token);
//   // مش logged in → روح login
//   if (!token) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   const userRole = (token.role as string) ?? "User";

//   // ✅ تحقق من الصلاحيات
//   for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
//     if (pathname.startsWith(route)) {
//       if (!allowed.includes(userRole)) {
//         return NextResponse.redirect(new URL("/forbidden", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
//   ],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const PROTECTED_API = [
//   "/api/admin",
//   "/api/dashboard",
//   "/api/stats",
// ];

// const ROUTE_ROLES: Record<string, string[]> = {
//   "/admin": ["Admin"],
//   "/clinic": ["Admin", "Clinic"],
// };

// // export async function middleware(req: NextRequest) {
// //   const { pathname } = req.nextUrl;

// //   // ✅ static files
// //   if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
// //     return NextResponse.next();
// //   }

// //   // 🔥 API RULE:
// //   // كل الـ API مفتوحة ماعدا 3 routes دول
// //   const isProtectedAPI = PROTECTED_API.some((p) =>
// //     pathname.startsWith(p)
// //   );

// //   if (!isProtectedAPI && pathname.startsWith("/api")) {
// //     return NextResponse.next();
// //   }

// //   // 🔒 لو API محمي → check auth
// //   if (pathname.startsWith("/api") && isProtectedAPI) {
// //     const token = await getToken({
// //       req,
// //       secret: process.env.AUTH_SECRET,
// //     });

// //     if (!token) {
// //       return NextResponse.json(
// //         { error: "Unauthorized" },
// //         { status: 401 }
// //       );
// //     }
// //   }

// //   // 🔒 صفحات الموقع
// //   if (
// //     pathname.startsWith("/login") ||
// //     pathname.startsWith("/main")
// //   ) {
// //     return NextResponse.next();
// //   }

// //   const token = await getToken({
// //     req,
// //     secret: process.env.AUTH_SECRET,
// //   });

// //   if (!token) {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   const role = token.role as string;

// //   for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
// //     if (pathname.startsWith(route)) {
// //       if (!allowed.includes(role)) {
// //         return NextResponse.redirect(new URL("/forbidden", req.url));
// //       }
// //     }
// //   }

// //   return NextResponse.next();
// // }




// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
//   ],
// };

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"


const PROTECTED_API = ["/api/admin", "/api/dashboard", "/api/stats"]

const ROUTE_ROLES: Record<string, string[]> = {
  "/admin": ["Admin"],
  "/clinic": ["Admin", "Clinic"],
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const token = req.auth // ✅ مباشرة من Auth.js v5

  // Public pages
  if (pathname.startsWith("/login") || pathname.startsWith("/main") ||  pathname.startsWith("/forgot-password") ||
  pathname.startsWith("/SignUpCompletion") ||
  pathname.startsWith("/verify-email") )  {
    return NextResponse.next()
  }

  // API routes
  if (pathname.startsWith("/api")) {
    const isProtectedAPI = PROTECTED_API.some((p) => pathname.startsWith(p))
    if (!isProtectedAPI) return NextResponse.next()

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.next()
  }

  // Protected pages
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const role = token.user?.role as string

  for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
    if (pathname.startsWith(route)) {
      if (!allowed.includes(role)) {
        return NextResponse.redirect(new URL("/forbidden", req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
  ],
}