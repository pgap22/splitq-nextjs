import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db/prisma";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async jwt({ token, user,trigger,session}) {
            
            if(trigger == "update"){
                const data = {
                    name: token.name,
                    lastname: token.lastname,
                    email: token.email
                }
       
                return{
                    ...data,
                    ...session.user
                }
            }

            if (user) {
                token.lastname = user.lastname
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.lastname = token.lastname
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})