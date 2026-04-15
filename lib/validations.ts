import * as z from 'zod';
import { GENDER } from '@/constants/enums/member/gender';
import { OCCUPATION } from '@/constants/enums/member/occupation';
import { MEMBER_TYPE } from '@/constants/enums/member/member_type';
import { EVENT } from '@/constants/enums/event/event';

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(3, 'User name must be at least 3 characters.')
    .max(20, 'User name must be at most 20 characters.')
    .regex(/^[a-zA-Z0-9_]+$/, 'User name can only contain letters, numbers, and underscores.'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters.')
    .max(32, 'First name must be at most 32 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces.'),
  middleName: z
    .string()
    .max(32, 'Middle name must be at most 32 characters.')
    .regex(/^[a-zA-Z\s]*$/, 'Middle name can only contain letters and spaces.')
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters.')
    .max(32, 'Last name must be at most 32 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces.'),
  gender: z
    .enum(GENDER, { required_error: 'Please select a gender.' }),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .max(255, 'Email must be at most 255 characters.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number.')
})

export const signInSchema = z.object ({
  email: z
    .string()
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
})

export const accountSchema = z.object({
  birthDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date.',
    }),
  contactNumber: z
    .string()
    .max(20, 'Contact number must be at most 20 characters.')
    .regex(/^[\d\s\-\+\(\)]*$/, 'Contact number can only contain numbers, spaces, dashes, plus signs, and parentheses.')
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .max(500, 'Address must be at most 500 characters.')
    .optional()
    .or(z.literal('')),
  facebook: z
    .string()
    .max(255, 'Facebook username must be at most 255 characters.')
    .optional()
    .or(z.literal('')),
  occupation: z
    .enum(OCCUPATION, { required_error: 'Please select an occupation.' }),
  firstDateAttended: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date.',
    }),
  firstEvent: z
    .enum(EVENT, { required_error: 'Please select the first event attended.' })
    .optional(),
  memberType: z
    .enum(MEMBER_TYPE, { required_error: 'Please select a member type.' }),
})