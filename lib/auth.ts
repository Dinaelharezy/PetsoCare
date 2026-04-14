// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [

//     // ── Credentials: Email + Password → your .NET API ─────────────
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email:    { label: "Email",    type: "email" },    // ✅ fixed: was "username"
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//             //   email:    credentials.email,     
//             //   password: credentials.password,
//              email:    credentials?.email    ?? "",   
//               password: credentials?.password ?? "", 
//             }),
//           });

//            if (!res.ok) {
//       const err = await res.json()
//       console.error('Login API error:', JSON.stringify(err))
//       return null
//     }

//           const data = await res.json();
//           // .NET returns: { id, name, email, role: "Admin", token: "..." }
//           return {
//             id:          String(data.id),
//             name:        data.name,
//             email:       data.email,
//             roles:       [data.role],          // ✅ fixed: wrap single Role string in array
//             accessToken: data.token,
//           };
//         } catch {
//           return null;
//         }
//       },
//     }),

//     // ── Google OAuth ───────────────────────────────────────────────
//     GoogleProvider({
//       clientId:     process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {

//     // ── Google: sync with .NET by email (no GoogleId field in your User) ──
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         try {
//           const res = await fetch(`${process.env.DOTNET_API_URL}/auth/google`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: user.email,   // ✅ .NET identifies Google users by email only
//               name:  user.name,
//             }),
//           });

//           if (!res.ok) return false;

//           const data = await res.json();
//           // .NET returns: { id, name, email, role: "User", token: "..." }
//           user.id          = String(data.id);
//           user.roles       = [data.role];      // ✅ fixed: wrap single Role in array
//           user.accessToken = data.token;
//         } catch {
//           return false;
//         }
//       }
//       return true;
//     },

//     // ── Store id + roles + token in the JWT cookie ─────────────────
//     async jwt({ token, user }) {
//       if (user) {
//         token.id          = user.id;
//         token.roles       = user.roles ?? ["User"];
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },

//     // ── Expose on session.user for client & server use ─────────────
//     async session({ session, token }) {
//       session.user.id          = token.id;
//       session.user.roles       = token.roles;
//       session.user.accessToken = token.accessToken;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//     error:  "/login",
//   },

//   session: { strategy: "jwt" },
// });

//workinggg
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { DefaultSession } from "next-auth";

// // ── Type declarations ──────────────────────────────────────────────
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//       accessToken: string;
//     } & DefaultSession["user"];
//   }
//   interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     accessToken: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: string;
//     accessToken: string;
//   }
// }

// // ── API base URL ───────────────────────────────────────────────────
// const API = process.env.NEXT_PUBLIC_API_URL;

// // ── Headers بنبعتهم مع كل request للـ ngrok ───────────────────────
// const HEADERS = {
//   "Content-Type": "application/json",
//   "ngrok-skip-browser-warning": "true",
// };

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [

//     // ── 1. Email + Password ──────────────────────────────────────
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email:    { label: "Email",    type: "email"    },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${API}/api/auth/login`, {
//             method:  "POST",
//             headers: HEADERS,
//             body: JSON.stringify({
//               email:    credentials?.email    ?? "",
//               password: credentials?.password ?? "",
//             }),
//           });

//           if (!res.ok) {
//             const text = await res.text();
//             console.error("Login failed:", text);
//             return null;
//           }

//           const data = await res.json();
//           // .NET returns: { id, name, email, role, token }
//           return {
//             id:          String(data.id),
//             name:        data.name,
//             email:       data.email,
//             role:        data.role ?? "User",
//             accessToken: data.token,
//           };
//         } catch (e) {
//           console.error("Login error:", e);
//           return null;
//         }
//       },
//     }),

//     // ── 2. Google ────────────────────────────────────────────────
//     GoogleProvider({
//       clientId:     process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {

//     // بعد ما Google تنجح — نبعت بيانات المستخدم للـ .NET backend
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         try {
//           const res = await fetch(`${API}/api/auth/google-response`, {
//             method:  "POST",
//             headers: HEADERS,
//             body: JSON.stringify({
//               email: user.email,
//               name:  user.name,
//             }),
//           });

//           if (!res.ok) {
//             console.error("Google sync failed:", await res.text());
//             return false;
//           }

//           const data = await res.json();
//           user.id          = String(data.id);
//           user.role        = data.role ?? "User";
//           user.accessToken = data.token;
//         } catch (e) {
//           console.error("Google signIn error:", e);
//           return false;
//         }
//       }
//       return true;
//     },

//     // نحفظ البيانات في الـ JWT cookie
//     async jwt({ token, user }) {
//       if (user) {
//         token.id          = user.id;
//         token.role        = user.role ?? "User";
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },

//     // نوصّل البيانات للـ client عبر useSession()
//     async session({ session, token }) {
//       session.user.id          = token.id;
//       session.user.role        = token.role;
//       session.user.accessToken = token.accessToken;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//     error:  "/login",
//   },

//   session: { strategy: "jwt" },
// });
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
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    picture?: string; // ✅ needed to store image in JWT
  }
}

// ── API base URL ───────────────────────────────────────────────────
const API = process.env.NEXT_PUBLIC_API_URL;

// ── Headers بنبعتهم مع كل request للـ ngrok ───────────────────────
const HEADERS = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    // ── 1. Email + Password ──────────────────────────────────────
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
            const text = await res.text();
            console.error("Login failed:", text);
            return null;
          }

          const data = await res.json();
          // .NET returns: { id, name, email, role, token }
          return {
            id:          String(data.id),
            name:        data.name,
            email:       data.email,
            role:        data.role ?? "User",
            accessToken: data.token,
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

    // بعد ما Google تنجح — نبعت بيانات المستخدم للـ .NET backend
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
          user.id          = String(data.id);
          user.role        = data.role ?? "User";
          user.accessToken = data.token;
        } catch (e) {
          console.error("Google signIn error:", e);
          return false;
        }
      }
      return true;
    },

    // ✅ نحفظ البيانات في الـ JWT — وندعم update() من الـ client
    async jwt({ token, user, trigger, session }) {
      // On initial sign-in — populate token from user object
      if (user) {
        token.id          = user.id;
        token.role        = user.role ?? "User";
        token.accessToken = user.accessToken;
        token.name        = user.name;
        token.email       = user.email;
        // Google provider sets user.image automatically
        if (user.image) token.picture = user.image;
      }

      // ✅ When useEdit calls await update({ name, image, email })
      // trigger === 'update' and session contains whatever was passed to update()
      if (trigger === "update" && session) {
        if (session.name)  token.name    = session.name;
        if (session.image) token.picture = session.image;
        if (session.email) token.email   = session.email;
      }

      return token;
    },

    // ✅ نوصّل البيانات للـ client — including updated name/image/email
    async session({ session, token }) {
      session.user.id          = token.id;
      session.user.role        = token.role;
      session.user.accessToken = token.accessToken;

      // ✅ These come from token so they stay in sync after update()
      session.user.name  = token.name  ?? session.user.name;
      session.user.email = token.email ?? session.user.email;
      session.user.image = token.picture ?? session.user.image ?? null;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt" },
});