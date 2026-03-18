
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {           // ✅ لا import ولا extends — بس أضف الـ fields
    id: string;
    roles: string[];
    accessToken: string;
  }
}