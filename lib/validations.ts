import * as z from 'zod';
import { GENDER } from '@/constants/enums/member/gender';

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
    .enum(GENDER, { required_error: 'Please select a gender.' }),
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