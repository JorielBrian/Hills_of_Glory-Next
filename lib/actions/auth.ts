'use server';

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { signIn } from "@/auth";
import { GENDER } from "@/constants/enums/member/gender";
import { OCCUPATION } from "@/constants/enums/member/occupation";
import { MEMBER_TYPE } from "@/constants/enums/member/member_type";
import { EVENT } from "@/constants/enums/event/event";
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

// UPDATE ACCOUNT
export const updateAccount = async (params: {
  userId: string;
  birthDate?: string;
  contactNumber?: string;
  address?: string;
  facebook?: string;
  occupation: string;
  firstDateAttended?: string;
  firstEvent?: string;
  memberType: string;
}) => {
  const {
    userId,
    birthDate,
    contactNumber,
    address,
    facebook,
    occupation,
    firstDateAttended,
    firstEvent,
    memberType
  } = params;

  // Validate required fields
  if (!userId || !occupation || !memberType) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    await db.update(users)
      .set({
        birthDate: birthDate && birthDate.trim() ? sql`${new Date(birthDate)}` : null,
        contactNumber: contactNumber && contactNumber.trim() ? contactNumber : null,
        address: address && address.trim() ? address : null,
        facebook: facebook && facebook.trim() ? facebook : null,
        occupation: occupation as typeof OCCUPATION[number],
        firstDateAttended: firstDateAttended && firstDateAttended.trim() ? sql`${new Date(firstDateAttended)}` : null,
        firstEvent: firstEvent && firstEvent.trim() ? (firstEvent as typeof EVENT[number]) : null,
        memberType: memberType as typeof MEMBER_TYPE[number],
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return { success: true };
  } catch (error) {
    console.error('Update account error:', error);
    return { success: false, error: "Failed to update account. Please try again." };
  }
};