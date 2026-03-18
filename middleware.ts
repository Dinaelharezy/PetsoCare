// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ROUTE_ROLES: Record<string, string[]> = {
  "/admin":     ["Admin"],
  "/clinic":    ["Admin", "Editor", "User"],
  "/dashboard": ["Admin", "Editor", "User"],
};

const ROLE_HOME: Record<string, string> = {
  Admin:  "/admin",
  Editor: "/dashboard",
  User:   "/dashboard",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ── لو logged in وجاي على /login أو /SignUpCompletion ──────────
  if (token && (pathname === "/login" || pathname === "/SignUpCompletion")) {
    const userRoles: string[] = (token.roles as string[]) ?? ["User"];
    for (const role of ["Admin", "Editor", "User"]) {
      if (userRoles.includes(role)) {
        return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
      }
    }
  }

  // ── مش logged in → روح على /login ─────────────────────────────
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRoles: string[] = (token.roles as string[]) ?? ["User"];

  // ── Role-based route protection ────────────────────────────────
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
    // ✅ الصفحات المحمية
    "/admin/:path*",
    "/clinic/:path*",
    "/dashboard/:path*",
    "/login",
    "/SignUpCompletion",
  ],
};