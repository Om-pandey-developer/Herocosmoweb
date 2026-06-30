import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "bruce@wayne.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Gamification: Daily login bonus
        const now = new Date();
        const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt) : null;
        let coinsToAdd = 0;

        const isNewDay = !lastLogin || 
          lastLogin.getUTCFullYear() !== now.getUTCFullYear() ||
          lastLogin.getUTCMonth() !== now.getUTCMonth() ||
          lastLogin.getUTCDate() !== now.getUTCDate();

        if (isNewDay) {
          coinsToAdd = 5;
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLoginAt: now,
            heroCoins: {
              increment: coinsToAdd
            }
          }
        });

        return {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          heroCoins: updatedUser.heroCoins
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.heroCoins = user.heroCoins;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.heroCoins = token.heroCoins;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
