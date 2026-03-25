export const GENDER_LABEL = {
    MALE: 'Male',
    FEMALE: 'Female'
} as const;

export const GENDER = [
    'Male',
    'Female'
] as const;

export type Gender = typeof GENDER[number];