

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"


const PROTECTED_API = ["/api/admin", "/api/dashboard", "/api/stats"]

const ROUTE_ROLES: Record<string, string[]> = {
  "/admin": ["Admin"],
  "/clinic": ["Admin", "Clinic","Doctor"],
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const token = req.auth 

  // Public pages
  if (pathname.startsWith("/login") || pathname.startsWith("/main") ||  pathname.startsWith("/forgot-password") ||
  pathname.startsWith("/SignUpCompletion") ||  pathname.startsWith("/auth") ||    
  pathname.startsWith("/verify-email")  || pathname.startsWith("/reset-password") )  {
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