import { GENDER } from "@/constants/enums/member/gender";
import { MEMBER_TYPE } from "@/constants/enums/member/member_type";
import { OCCUPATION } from "@/constants/enums/member/occupation";
import { EVENT } from "@/constants/enums/event/event";
import { USER_TYPE } from "@/constants/enums/member/user_type";

import { AnyPgColumn, boolean, date, pgEnum, pgTable, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ENUMS
export const genderEnum = pgEnum('user_gender', GENDER);
export const occupationEnum = pgEnum('user_occupation', OCCUPATION);
export const eventEnum = pgEnum('church_event', EVENT);
export const memberTypeEnum = pgEnum('member_type', MEMBER_TYPE);
export const userTypeEnum = pgEnum('user_type', USER_TYPE);

// USERS TABLE
export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    
    // Authentication
    userName: varchar('user_name', { length: 225 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),

    // Authorization
    userType: userTypeEnum('user_type').default(USER_TYPE[0]).notNull(),

    // Profile Information
    firstName: varchar('first_name' , { length: 255 }).notNull(),
    middleName: varchar('middle_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    gender: genderEnum('gender').notNull(),
    birthDate: date('birth_date'),

    // Contact Information
    contactNumber: varchar('contact_number', { length: 20 }).unique(),
    address: varchar('address', { length: 500 }),
    facebook: varchar('facebook', { length: 255 }).unique(),

    // Professional Information
    occupation: occupationEnum('occupation').default(OCCUPATION[5]).notNull(),

    // Church Information
    invitedBy: uuid('invited_by_id').references((): AnyPgColumn => users.id),
    firstDateAttended: date('first_date_attended'),
    firstEvent: eventEnum('first_event'),
    memberType: memberTypeEnum('member_type').default(MEMBER_TYPE[0]).notNull(),
    isActive: boolean('is_active').default(true).notNull(),

    // Timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    lastActivityDate: timestamp('last_activity_date').defaultNow().notNull()
}, (table) => ({
    emailIdx: index('email_idx').on(table.email),
    userNameIdx: index("username_idx").on(table.userName),
    userTypeIdx: index('user_type_idx').on(table.userType),
    isActiveIdx: index('is_active_idx').on(table.isActive),
}));

// LIFEGROUPS TABLE
export const lifegroups = pgTable('lifegroups', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 225}).notNull(),
    description: varchar('description', { length: 500 }),
    networkLeader: uuid('network_leader_id').references(() => users.id),
    lifeguide: uuid('life_guide_id').references(() => users.id),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
    networkLeaderIdx: index('network_leader_idx').on(table.networkLeader),
    lifeguideIdx: index('lifeguide_idx').on(table.lifeguide),
    isActiveIdx: index('lifegroup_is_active_idx').on(table.isActive),
}));

// LIFEGROUP MEMBERS TABLE
export const lifegroupMembers = pgTable("lifegroup_members", {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  lifegroupId: uuid('lifegroup_id')
    .notNull()
    .references(() => lifegroups.id, { onDelete: 'cascade' }),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
}, (table) => ({
    userIdIdx: index('lifegroup_member_user_id_idx').on(table.userId),
    lifegroupIdIdx: index('lifegroup_member_lifegroup_id_idx').on(table.lifegroupId),
}));

// RELATIONS
export const usersRelations = relations(users, ({ one, many }) => ({
  invitedByUser: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
  }),
  invitedUsers: many(users, {
    relationName: 'invitedBy'
  }),
  lifegroupsAsLeader: many(lifegroups, {
    relationName: 'networkLeader'
  }),
  lifegroupsAsGuide: many(lifegroups, {
    relationName: 'lifeguide'
  }),
  lifegroupMemberships: many(lifegroupMembers),
}));

export const lifegroupsRelations = relations(lifegroups, ({ one, many }) => ({
  networkLeaderUser: one(users, {
    fields: [lifegroups.networkLeader],
    references: [users.id],
    relationName: 'networkLeader'
  }),
  lifeGuideUser: one(users, {
    fields: [lifegroups.lifeguide],
    references: [users.id],
    relationName: 'lifeguide'
  }),
  members: many(lifegroupMembers),
}));

export const lifegroupMembersRelations = relations(lifegroupMembers, ({ one }) => ({
  user: one(users, {
    fields: [lifegroupMembers.userId],
    references: [users.id],
  }),
  lifegroup: one(lifegroups, {
    fields: [lifegroupMembers.lifegroupId],
    references: [lifegroups.id],
  }),
}));