import * as z from 'zod';

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(5, 'User name must be at least 5 characters.')
    .max(20, 'User name must be at most 20 characters.'),
  firstName: z
    .string()
    .min(5, 'First name must be at least 5 characters.')
    .max(32, 'First name must be at most 32 characters.'),
  middleName: z
    .string()
    .min(5, 'Middle name must be at least 5 characters.')
    .max(32, 'Middle name must be at most 32 characters.'),
  lastName: z
    .string()
    .min(5, 'Last name must be at least 5 characters.')
    .max(32, 'Last name must be at most 32 characters.'),
  gender: z
    .string()
    .min(4, 'Gender must be at least 4 characters.'),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters.')
})

export const signInSchema = z.object ({
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(5, 'Password must be at least 3 characters.')
})