'use server';

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { GENDER } from "@/constants/enums/member/gender";
import type { AuthCredentials } from "@/types";
import { compare } from "bcryptjs";

// SIGN IN
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;

  if (!email || !password) {
    return { success: false, error: "Missing credentials" };
  }

  const emailNormalized = email.toLowerCase().trim();

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, emailNormalized))
      .limit(1);

    if (user.length === 0) {
      return { success: false, error: "Invalid email or password" };
    }

    const isValid = await compare(password, user[0].password);

    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // ✅ Only sign in AFTER validation passes
    await signIn("credentials", {
      email: emailNormalized,
      password,
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

// SIGN UP
export const signUp = async (params: AuthCredentials) => {
  const { userName, email, password, firstName, lastName, gender } = params;

  // Validate required fields
  if (!email || !password || !userName || !firstName || !lastName || !gender) {
    return { success: false, error: "Missing required fields" };
  }

  const emailNormalized = email.toLowerCase().trim();
  const userNameNormalized = userName.trim();

  if (!GENDER.includes(gender)) {
    return { success: false, error: "Invalid gender" };
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, emailNormalized))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User with this email already exists" };
  }

  // Check if username already exists
  const existingUserName = await db
    .select()
    .from(users)
    .where(eq(users.userName, userNameNormalized))
    .limit(1);

  if (existingUserName.length > 0) {
    return { success: false, error: "Username already taken" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      userName: userNameNormalized,
      email: emailNormalized,
      password: hashedPassword,
      firstName: firstName.trim(),
      middleName: params.middleName?.trim() || null,
      lastName: lastName.trim(),
      gender: gender as typeof GENDER[number],
    });

    // Sign in the user immediately after successful registration
    try {
      await signIn('credentials', {
        email: emailNormalized,
        password,
        redirect: false,
      });
    } catch (error) {
      console.error('Auto sign-in failed:', error);
      return {
        success: false,
        error: "Account created but sign-in failed. Please try signing in manually."
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: "Failed to create account. Please try again." };
  }
};