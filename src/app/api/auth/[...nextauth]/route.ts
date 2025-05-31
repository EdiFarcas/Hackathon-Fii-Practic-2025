import NextAuth from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "./authOptions";

if (!db) {
  throw new Error("Prisma client is not initialized. Check your database configuration.");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };