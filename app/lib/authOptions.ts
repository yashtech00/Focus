import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import prisma from "./db";
import bcrypt from "bcryptjs";

export const authOptions = {
  Providers: [
    GithubProvider( {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider( {
      credentials: {
        username: { type: "text", placeholder: "Enter the username" },
        email: { type: "email", placeholder: "Enter your email" },
        password: { type: "password", placeholder: "Enter the password" },
        },
        async authorize(credentials) {
            
            if (!credentials || !credentials.email || !credentials.password) {
                return null;
            }
            const UsernameValid = usernameSchema.safeParse(credentials.username);
            if (!UsernameValid.success) {
                return NextResponse.json({
                    message:"Wrong Email format"
                }, {
                    status:401
                })
            }

            const emailValid = emailSchema.safeParse(credentials.email);
            if (!emailValid.success) {
                return NextResponse.json({
                    message:"Wrong Email format"
                }, {
                    status:401
                })
            }

            const passwordValid = passwordSchema.safeParse(credentials.password);
            if (!passwordValid.success) {
                return NextResponse.json({
                    message:"Wrong Password format"
                }, {
                    status:401
                })
            }
            const 

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email:emailValid.data
                    }
                })
                const hashedPassword = await bcrypt.hash(passwordValid.data, 10);
                if (!user) {
                    const newUser = await prisma.user.create({
                        data: {
                            username: UsernameValid.data,
                            password: hashedPassword,
                            email:emailValid.data
                        }
                    })
                    return NextResponse.json({
                        message: "User account created",
                        newUser
                    }, {
                        status:200
                    })
                }
                if(!user.password)
                return NextResponse.json({
                    message: "User Found",
                    user
                }, {
                    status:200
                })
            } catch (e) {
                console.error(e);
                
            }



            
        }
    }),
    ],
};
