import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { SessionStrategy } from "next-auth";
import { db } from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database" as SessionStrategy,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (!user || !account || !profile) {
        console.error("Sign-in failed: Missing user, account, or profile data.");
        return false;
      }
      return true;
    },    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: { session: any; user: any }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.youtubeHandle = user.youtubeHandle;
        session.user.coins = user.coins ?? 0;
        session.user.gamesWon = user.gamesWon ?? 0;
      }
      return session;
    },
  },
  debug: true, // Enable debug mode for detailed error messages
};