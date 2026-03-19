

// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const ROUTE_ROLES: Record<string, string[]> = {
//   "/admin":  ["Admin"],           
//   "/clinic": ["Admin", "Clinic"],
// };

// const ROLE_HOME: Record<string, string> = {
//   Admin:  "/admin",
//   Editor: "/dashboard",
//   User:   "/dashboard",
// };

// const PUBLIC_PATHS = [
//   "/login",
//   "/SignUpCompletion",
//   "/main",
//   "/api/auth",
//   "/_next",
//   "/favicon.ico",
//   "/Images",        // ✅ لو عندك صور من الـ API
// ];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // ✅ Public pages — اسمح بيها مباشرة
//   if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
//     return NextResponse.next();
//   }

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   // ── مش logged in → /login
//   if (!token) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   const userRoles: string[] = (token.roles as string[]) ?? ["User"];

//   // ── Role-based protection
//   for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
//     if (pathname.startsWith(route)) {
//       const hasAccess = allowed.some((r) => userRoles.includes(r));
//       if (!hasAccess) {
//         return NextResponse.redirect(new URL("/forbidden", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ROUTE_ROLES: Record<string, string[]> = {
  "/admin":  ["Admin"],
  "/clinic": ["Admin", "Clinic"],
};

const PUBLIC_PATHS = [
  "/login",
  "/SignUpCompletion",
  "/main",
  "/api/auth",
  "/_next",
  "/favicon.ico",
  "/Images",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Static files — صور وملفات
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map|json|txt|woff|woff2|ttf)$/)) {
    return NextResponse.next();
  }

  // ✅ Public pages
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ── مش logged in → /login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRoles: string[] = (token.roles as string[]) ?? ["User"];

  // ── Role-based protection
  for (const [route, allowed] of Object.entries(ROUTE_ROLES)) {
    if (pathname.startsWith(route)) {
      const hasAccess = allowed.some((r) => userRoles.includes(r));
      if (!hasAccess) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)",
  ],
};