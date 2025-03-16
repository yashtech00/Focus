import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

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

            
            
        }
    }),
    ],
};
