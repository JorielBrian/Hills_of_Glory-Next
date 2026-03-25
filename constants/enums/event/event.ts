export const EVENT_LABEL = {
    // REGULAR SERVICES
    SUNDAY_SERVICE: 'Sunday Service',
    PROTEGE: 'Protege',
    PRAYER_ENCOUNTER: 'Prayer Encounter',
    
    // ONCE A MONTH SERVICE
    PROTEGE_GIG: 'Protege Gig',
    SOAKING: 'Soaking',
    
    // MAIN CHURCH SERVICE
    PRAYER_FASTING: 'Prayer and Fasting',
    LIFE_GUIDE_SUMMIT: 'Life Guide Summit',

    // HILLS JOURNEY
    LIFE_GROUP: 'Life Group',
    START_UP: 'Start Up Session',
    NEW_LIFE_RETREAT: 'New Life Retreat',

    // SPECIAL EVENT
    SIMBANG_GABI: 'Simbang Gabi',
    CONCERT: 'Concert',
    ANNIVERSARY: 'Anniversary',
    CONFERENCE: 'Conference',
    BAPTISM: 'Baptism',
} as const;

export const EVENT = [
    // REGULAR SERVICES
    'Sunday Service',
    'Protege',
    'Prayer Encounter',
    
    // ONCE A MONTH SERVICE
    'Protege Gig',
    'Soaking',
    
    // MAIN CHURCH SERVICE
    'Prayer and Fasting',
    'Life Guide Summit',

    // HILLS JOURNEY
    'Life Group',
    'Start Up Session',
    'New Life Retreat',

    // SPECIAL EVENT
    'Simbang Gabi',
    'Concert',
    'Anniversary',
    'Conference',
    'Baptism',
] as const;

export type Event = typeof EVENT[number];