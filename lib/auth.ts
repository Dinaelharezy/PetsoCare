

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";

// ── Type declarations ──────────────────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken: string;
    image?: string;
  }
}

const API = process.env.NEXT_PUBLIC_API_URL;

const HEADERS = {
  "Content-Type": "application/json",
};

// ── Helper: decode JWT ─────────────────────────────────────────────
function parseJwt(token: string): Record<string, unknown> {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return {};
  }
}

// ── Helper: fetch profile image after login ────────────────────────
async function fetchProfileImage(token: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${API}/api/auth/me`, {
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const raw = data.imageUrl ?? data.image ?? undefined;
    if (!raw) return undefined;
    return raw.startsWith("http") ? raw : `${API}${raw}`;
  } catch {
    return undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    // ── 1. Email + Password ──────────────────────────────────────
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
         token:    { label: "Token",    type: "text"     },
      },
      async authorize(credentials) {
        
  if (credentials?.token) {
    const token = credentials.token as string
    const decoded = parseJwt(token)
    const role =
      (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as string)
      ?? "User"
    const image = await fetchProfileImage(token)

    return {
      id:          String(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? ""),
      name:        decoded["name"] as string ?? "",
      email:       decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] as string ?? "",
      role,
      accessToken: token,
      image,
    }
  }

        try {
          const res = await fetch(`${API}/api/auth/login`, {
            method:  "POST",
            headers: HEADERS,
            body: JSON.stringify({
              email:    credentials?.email    ?? "",
              password: credentials?.password ?? "",
            }),
          });

          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null;
          }

          const data = await res.json();

          // ✅ decode الـ JWT بتاع الـ backend عشان تجيب الـ role
          const decoded = parseJwt(data.token);
          const role =
            (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as string)
            ?? "User";

          const image = await fetchProfileImage(data.token);

          return {
            id:          String(data.id),
            name:        data.name,
            email:       data.email,
            role,        // ✅ من الـ JWT مباشرة
            accessToken: data.token,
            image,
          };
        } catch (e) {
          console.error("Login error:", e);
          return null;
        }
      },
    }),

    // ── 2. Google ────────────────────────────────────────────────
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${API}/api/auth/google-response`, {
            method:  "POST",
            headers: HEADERS,
            body: JSON.stringify({
              email: user.email,
              name:  user.name,
            }),
          });

          if (!res.ok) {
            console.error("Google sync failed:", await res.text());
            return false;
          }

          const data = await res.json();

          // ✅ decode role for Google users too
          const decoded = parseJwt(data.token);
          const role =
            (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as string)
            ?? "User";

          user.id          = String(data.id);
          user.role        = role;
          user.accessToken = data.token;

          const uploadedImage = await fetchProfileImage(data.token);
          if (uploadedImage) user.image = uploadedImage;

        } catch (e) {
          console.error("Google signIn error:", e);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id          = user.id;
        token.role        = user.role ?? "User";
        token.accessToken = user.accessToken;
        token.name        = user.name;
        token.email       = user.email;
        if (user.image) token.picture = user.image;
      }

      if (trigger === "update" && session) {
        if (session.name)  token.name    = session.name;
        if (session.image) token.picture = session.image;
        if (session.email) token.email   = session.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id          = (token.id as string)          ?? "";
      session.user.role        = (token.role as string)        ?? "User";
      session.user.accessToken = (token.accessToken as string) ?? "";
      session.user.name        = (token.name as string)        ?? session.user.name;
      session.user.email       = (token.email as string)       ?? session.user.email;
      session.user.image       = (token.picture as string)     ?? session.user.image ?? undefined;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  // session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
 session: { 
    strategy: "jwt", 
    maxAge: 24 * 60 * 60,  
  },
  
  
  jwt: {
    maxAge: 24 * 60 * 60,  
  },

  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60, // 24 ساعة
      },
    },

  },
});