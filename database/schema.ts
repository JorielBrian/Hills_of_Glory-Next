import { GENDER } from "@/constants/enums/member/gender";
import { MEMBER_TYPE } from "@/constants/enums/member/member_type";
import { OCCUPATION } from "@/constants/enums/member/occupation";
import { EVENT } from "@/constants/enums/event/event";
import { USER_TYPE } from "@/constants/enums/member/user_type";

import { AnyPgColumn, boolean, date, pgEnum, pgTable, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// USER
export const genderEnum = pgEnum('user_gender', GENDER);
export const occupationEnum = pgEnum('user_occupation', OCCUPATION);
export const eventEnum = pgEnum('church_event', EVENT);
export const memberTypeEnum = pgEnum('member_type', MEMBER_TYPE);
export const userTypeEnum = pgEnum('user_type', USER_TYPE);

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    
    // ACCOUNT
    userName: varchar('user_name', { length: 225 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),

    // Authorization
    userType: userTypeEnum('user_type').default(USER_TYPE[0]).notNull(),                    // User Type Enum

    // PROFILE
    firstName: varchar('first_name' , { length: 255 }).notNull(),
    middleName: varchar('middle_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    gender: genderEnum('gender').notNull(),                                                 // Gender Enum
    birthDate: date('birth_date'),

    // CONTACTS
    contactNumber: varchar('contact_number', { length: 20 }).unique(),
    address: varchar('address', { length: 500 }),
    facebook: varchar('facebook', { length: 255 }).unique(),

    // PERSONAL
    occupation: occupationEnum('occupation').default(OCCUPATION[5]).notNull(),              // Occupation Enum

    // CHURCH
    invitedBy: uuid('invited_by_id').references((): AnyPgColumn => users.id),               //  Invited by another user
    firstDateAttended: date('first_date_attended'),
    firstEvent: eventEnum('first_event'),                                                   // First Event - Event Enum
    memberType: memberTypeEnum('member_type').default(MEMBER_TYPE[0]).notNull(),            // Member Type Enum
    isActive: boolean('is_active').default(true).notNull(),

    // DATES
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    lastActivityDate: timestamp('last_activity_date').defaultNow().notNull()
}, (table) => ({
    emailIdx: index('email_idx').on(table.email),
    userNameIdx: index("username_idx").on(table.userName),
}));

export const lifegroups = pgTable('lifegroups', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 225}).notNull(),
    networkLeader: uuid('network_leader_id').references(() => users.id),                    // Network Leader
    lifeguide: uuid('life_guide_id').references(() => users.id),                            // Life Guide
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const lifegroupMembers = pgTable("lifegroup_members", {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),

  lifegroupId: uuid('lifegroup_id')
    .notNull()
    .references(() => lifegroups.id),

  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  invitedByUser: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
  }),
}));

export const lifegroupsRelations = relations(lifegroups, ({ one }) => ({
  networkLeaderUser: one(users, {
    fields: [lifegroups.networkLeader],
    references: [users.id],
  }),
  lifeGuideUser: one(users, {
    fields: [lifegroups.lifeguide],
    references: [users.id],
  }),
}));