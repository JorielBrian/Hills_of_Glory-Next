'use server';

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { GENDER } from "@/constants/enums/member/gender";
import type { AuthCredentials } from "@/types";

// SIGN IN
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;

  if (!email || !password) {
    return { success: false, error: "Missing credentials" };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    console.log(error, "Sign in error");

    return {
      success: false,
      error: "Invalid email or password",
    };
  }
};

// SIGN UP
export const signUp = async (params: AuthCredentials) => {
  const { userName, email, password, firstName, lastName, gender } = params;

  // ✅ validation
  if (!email || !password || !userName) {
    return { success: false, error: "Missing required fields" };
  }

  const emailNormalized = email.toLowerCase();

  if (!GENDER.includes(gender)) {
    return { success: false, error: "Invalid gender" };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, emailNormalized))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      userName,
      email: emailNormalized,
      password: hashedPassword,
      firstName,
      lastName,
      gender: gender as typeof GENDER[number],
    });

    // ✅ immediately sign in AND redirect
    await signIn('credentials', {
      email,
      password,
      redire: false,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Signup error" };
  }
};