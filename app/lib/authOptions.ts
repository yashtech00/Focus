import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { emailSchema, passwordSchema, UsernameSchema } from "../Schema/type";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        username: { type: "text", placeholder: "Enter the username" },
        email: { type: "email", placeholder: "Enter your email" },
        password: { type: "password", placeholder: "Enter the password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const UsernameValid = UsernameSchema.safeParse(credentials.username);
        if (!UsernameValid.success) {
          return NextResponse.json(
            {
              message: "Wrong Email format",
            },
            {
              status: 401,
            }
          );
        }

        const emailValid = emailSchema.safeParse(credentials.email);
        if (!emailValid.success) {
          return NextResponse.json(
            {
              message: "Wrong Email format",
            },
            {
              status: 401,
            }
          );
        }

        const passwordValid = passwordSchema.safeParse(credentials.password);
        if (!passwordValid.success) {
          return NextResponse.json(
            {
              message: "Wrong Password format",
            },
            {
              status: 401,
            }
          );
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: emailValid.data,
            },
          });
          const hashedPassword = await bcrypt.hash(passwordValid.data, 10);
          
          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                username: UsernameValid.data,
                password: hashedPassword,
                email: emailValid.data,
                provider: "Credentials",
                teamId:"default"
              },
            });
            return NextResponse.json(
              {
                message: "User account created",
                newUser,
              },
              {
                status: 200,
              }
            );
          }
          if (!user.password) {
            const authUser = await prisma.user.update({
              where: {
                email: emailValid.data,
              },
              data: {
                password: hashedPassword,
              },
            });
            return authUser;
          }

          const passwordVerify = await bcrypt.compare(
            passwordValid.data,
            user.password
          );
          if (!passwordVerify) {
            throw new Error("Wrong password");
          }
          return NextResponse.json(
            {
              message: "User Found",
              user,
            },
            {
              status: 200,
            }
          );
        } catch (e) {
          console.error(e);
          return NextResponse.json(
            {
              message: "Internal server error",
            },
            {
              status: 200,
            }
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ account, profile, token }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (user) {
          session.user.id = user.uid;
        }
      } catch (e) {
        console.error(e);
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "github" && profile) {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.email || "",
                username: profile?.name || undefined,
                provider: "Github",
                teamId:"default"
                
              },
            });
          }
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
}satisfies NextAuthOptions
