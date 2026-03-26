import { Member } from "@/types";

enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

enum Occupation {
    STUDENT = 'Student',
    UNEMPLOYED = 'Unemployed',
    YOUNG_PROFESSIONAL = 'Young Professional',
    PROFESSIONAL = 'Professional',
    OTHERS = 'Others'
}

enum MemberRole {
    HEAD_PASTOR = 'Head Pastor',
    PASTOR = 'Pastor',
    CORE_LEADER = 'Core Leader',
    LIFE_GUIDE = 'Life Guide',
    MEMBER = 'Member',
    FIRST_TIMER = 'First Timer',
    NEW_SOUL = 'Newly Won Soul'
}

enum HillsJourney {
    START_UP_SESSION = 'Start Up Session',
    NEW_LIFE_RETREAT = 'New Life Retreat',
    DISCIPLERS_COURSE = 'Disciplers Course',
    FOUNDATION_SERIES = 'Foundation Series',
    GRADUATE = 'HLA Graduate'
}

enum Ministry {
    ADMINISTRATION = 'Administration',
    CONSOLIDATION = 'Consolidation',
    CREATIVE = 'Creative',
    EDUCATION = 'Education',
    EVENTS = 'Events',
    FINANCE = 'Finance',
    HILLS_KIDS = 'Hills Kids',
    HOSPITALITY = 'Hospitality',
    MUSIC_AND_ARTS = 'Music and Arts'
}

enum MinistryRole {
    //People who can post or view their ministry announcments or postings
    DIRECTOR = 'Director',
    LEADER = 'Leader',
    ADMIN = 'Admin',
    // Members onl,
    MEMBER = 'Member',
    TRAINEE = 'Trainee'
}

enum Services {
    // WEEKLY SERVICES
    SUNDAY_SERVICE = 'Sunday Service',
    PRAYER_ENCOUNTER = 'Prayer Encounter',
    PROTEGE = 'Protege',
    // MONTHLY SERVICE,
    PROTEGE_GIG = 'Protege Gig',
    SOAKING = 'Soaking',
    PRAYER_AND_FASTING = 'Prayer and Fasting',
    LIFEGUIDE_SUMMIT = 'Lifeguide Summit',
    // SPIRITUAL JOURNE,
    STARTUP = 'Start Up',
    RETREAT = 'Retreat',
    // ANNUAL EVENT,
    CONCERT = 'Concert',
    SIMBANG_GABI = 'Simbang Gabi',
    LIFEGUIDE_ONBOARDING = 'Lifeguide Onboarding',
    OTHER = 'Other'
}

export const sampleMembers: Member[] = [
    {
        id: 1,
        first_name: "John",
        middle_name: "Doe",
        last_name: "Smith",
        gender: Gender.MALE,
        birth_date: "1990-01-01",
        address: "123 Main St, City, State 12345",
        contact: "555-1234",
        email: "john.smith@example.com",
        occupation: Occupation.STUDENT,
        is_married: false,
        invited_by: "Jane Doe",
        date_invited: "2023-01-01",
        service_invited: Services.SUNDAY_SERVICE,
        facebook_account: "john.smith.facebook",
        member_photo: "/images/john-smith.jpg",
        member_role: MemberRole.MEMBER,
        hills_journey: HillsJourney.GRADUATE,
        ministry: Ministry.CREATIVE,
        ministry_role: MinistryRole.MEMBER,
        ministry_assignment: "Event Planning",
        life_group_id: 1,
        network_leader_id: 1,
        is_active: true
    }
];

// AUTHENTICATION

interface FIELDNAME_PROP {
    userName: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    email: string,
    password: string
}

export const FIELD_NAMES: FIELDNAME_PROP = {
    userName: "User Name",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    gender: "Gender",
    email: "Email",
    password: "Password",
}

export const FIELD_TYPES = {
    userName: "text",
    firstName: "text",
    middleName: "text",
    lastName: "text",
    gender: "text",
    email: "email",
    password: "password",
}