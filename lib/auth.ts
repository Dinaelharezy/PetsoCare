import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    // ── Credentials: Email + Password → your .NET API ─────────────
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },    // ✅ fixed: was "username"
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            //   email:    credentials.email,     
            //   password: credentials.password,
             email:    credentials?.email    ?? "",   
              password: credentials?.password ?? "", 
            }),
          });

           if (!res.ok) {
      const err = await res.json()
      console.error('Login API error:', JSON.stringify(err))
      return null
    }

          const data = await res.json();
          // .NET returns: { id, name, email, role: "Admin", token: "..." }
          return {
            id:          String(data.id),
            name:        data.name,
            email:       data.email,
            roles:       [data.role],          // ✅ fixed: wrap single Role string in array
            accessToken: data.token,
          };
        } catch {
          return null;
        }
      },
    }),

    // ── Google OAuth ───────────────────────────────────────────────
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {

    // ── Google: sync with .NET by email (no GoogleId field in your User) ──
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${process.env.DOTNET_API_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,   // ✅ .NET identifies Google users by email only
              name:  user.name,
            }),
          });

          if (!res.ok) return false;

          const data = await res.json();
          // .NET returns: { id, name, email, role: "User", token: "..." }
          user.id          = String(data.id);
          user.roles       = [data.role];      // ✅ fixed: wrap single Role in array
          user.accessToken = data.token;
        } catch {
          return false;
        }
      }
      return true;
    },

    // ── Store id + roles + token in the JWT cookie ─────────────────
    async jwt({ token, user }) {
      if (user) {
        token.id          = user.id;
        token.roles       = user.roles ?? ["User"];
        token.accessToken = user.accessToken;
      }
      return token;
    },

    // ── Expose on session.user for client & server use ─────────────
    async session({ session, token }) {
      session.user.id          = token.id;
      session.user.roles       = token.roles;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt" },
});