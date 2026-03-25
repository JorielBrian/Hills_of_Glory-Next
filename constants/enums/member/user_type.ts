export const USER_TYPE_LABEL = {
    REGULAR: 'Regular',
    MINISTRY_LEADER: 'Ministry Leader',
    MINISTRY_DIRECTOR: 'Ministry Director',
    ADMIN: 'Admin',
    SUPER_ADMIN: 'Super Admin',
    DEVELOPER: 'Developer'
} as const;

export const USER_TYPE = [
    'Regular',
    'Ministry Leader',
    'Ministry Director',
    'Admin',
    'Super Admin',
    'Developer'
] as const;

export type UserType = typeof USER_TYPE[number];