import { GENDER } from "./constants/enums/member/gender";

export interface Member {
    id: number,
    first_name: string,
    middle_name: string,
    last_name: string,
    gender: Gender,
    birth_date: string,
    address: string,
    contact: string,
    email: string,
    occupation: Occupation,
    is_married: boolean,
    invited_by: string,
    date_invited: string,
    service_invited: Services,
    facebook_account: string,
    member_photo: string,
    member_role: MemberRole,
    hills_journey: HillsJourney,
    ministry: Ministry,
    ministry_role: MinistryRole,
    ministry_assignment: string,
    life_group_id: number,
    network_leader_id: number,
    is_active: boolean
}

export interface AuthCredentials {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: typeof GENDER[number];
}

declare module "next-auth" {
    interface User {
        userType?: string;
        firstName?: string;
        lastName?: string;
        userName?: string;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            userType?: string;
            firstName?: string;
            lastName?: string;
            userName?: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userType?: string;
        firstName?: string;
        lastName?: string;
        userName?: string;
    }
}