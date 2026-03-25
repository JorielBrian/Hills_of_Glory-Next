'use server';

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { GENDER } from "@/constants/enums/member/gender";
import type { AuthCredentials } from "@/types";

export const signInWithCredentials = async ( params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params;
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (result?.error){
            return { success: false, error: result.error};
        }
    } catch (error) {
        console.log(error, "Sign in error");
        return { success: false, error: "Sign in error"}
    }
}

export const signUp = async(params: AuthCredentials) => {
    const { userName, email, password, firstName, lastName, gender } = params;

    const existingUser = await db.
        select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if( existingUser.length > 0 ) {
        return {success: false, error: "User already exists"};
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            gender: gender as typeof GENDER[number]
        })

        // await  signInWithCredentials({ email, password})

        return { success: true};
    } catch (error) {
        console.log(error);
        return { success: false, error: "Signup error"}
    }
}