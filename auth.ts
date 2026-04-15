import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";

import { db } from "@/database/db"
import { users } from "./database/schema";
import { eq } from "drizzle-orm";

import CredentialsProvider from "next-auth/providers/credentials";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email.toString().toLowerCase();

                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                if(user.length === 0 ) return null;

                const isPasswordValid = await compare(
                    credentials.password.toString(),
                    user[0].password,
                )

                if (!isPasswordValid) return null;

                return {
                    id: user[0].id.toString(),
                    email: user[0].email,
                    name: user[0].firstName + " " + user[0].lastName,
                    userType: user[0].userType,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    userName: user[0].userName,
                } as User;
            }
        })
    ],
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({token, user}) {
            if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.userType = user.userType;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.userName = user.userName;
            }

            return token;
        },
        async session({ session, token }) {
            if(session.user){
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.userType = token.userType as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.userName = token.userName as string;
            }

            return session;
        }
    }
})