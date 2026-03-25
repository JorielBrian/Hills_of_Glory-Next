export const MEMBER_TYPE_LABELS = {
    FIRST_TIMER: 'First Timer',
    VISITOR: 'Visitor',
    MEMBER: 'Member',
    LIFE_GUIDE: 'Life Guide',
    CORE_LEADER: 'Core Leader',
    PASTOR: 'Pastor',
    HEAD_PASTOR: 'Head Pastor'
} as const;

export const MEMBER_TYPE = [
    'First Timer',
    'Visitor',
    'Member',
    'Life Guide',
    'Core Leader',
    'Pastor',
    'Head Pastor'
] as const;

export type MemberType = typeof MEMBER_TYPE[number];