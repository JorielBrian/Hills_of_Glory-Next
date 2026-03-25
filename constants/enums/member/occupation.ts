export const OCCUPATION_LABELS = {
    STUDENT: 'Student',
    UNEMPLOYED: 'Unemployed',
    YOUNG_PROFESSIONAL: 'Young Professional',
    PROFESSIONAL: 'Professional',
    BUSINESS_OWNER: 'Business Owner',
    OTHERS: 'Others'
} as const;

export const OCCUPATION = [
    'Student',
    'Unemployed',
    'Young Professional',
    'Professional',
    'Business Owner',
    'Others'
] as const;

export type Occupation = typeof OCCUPATION[number];