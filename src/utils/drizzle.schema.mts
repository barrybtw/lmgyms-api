import {
  pgTable,
  serial,
  varchar,
  uniqueIndex,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).unique(),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    password_salt: varchar('password_salt', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
  },
  (table) => {
    return {
      usernameIdx: uniqueIndex('username_idx').on(table.username),
      idIdx: uniqueIndex('id_idx').on(table.id),
    };
  },
);

export const user_relations = relations(user, ({ many }) => ({
  session: many(session),
  calendar: many(calendar_to_user_relations),
}));

export const session = pgTable(
  'session',
  {
    id: serial('id').primaryKey(),
    user_id: serial('user_id').notNull(),
    token: varchar('token', { length: 255 }).unique().notNull(),
    expiration_date: timestamp('expiration_date').notNull(),
    csrf_token: varchar('csrf_token', { length: 255 }).notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex('token_idx').on(table.token),
  }),
);

export const session_relations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.user_id],
    references: [user.id],
  }),
}));

export const calendar = pgTable(
  'calendar',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    time_of_creation: timestamp('creation_date').defaultNow(),
    author_id: serial('author_id').notNull(),
  },
  (table) => {
    return {
      nameIdx: uniqueIndex('name_idx').on(table.name),
    };
  },
);

export const calendar_relations = relations(calendar, ({ many }) => ({
  calendar_to_user_relations: many(calendar_to_user_relations),
}));

export const calendar_participant = pgTable(
  'calendar_participant',
  {
    calendar_id: serial('calendar_id').notNull(),
    user_id: serial('user_id').notNull(),
  },
  (t) => ({
    pk: primaryKey(t.user_id, t.calendar_id),
  }),
);

export const calendar_to_user_relations = relations(
  calendar_participant,
  ({ one }) => ({
    calendar: one(calendar, {
      fields: [calendar_participant.calendar_id],
      references: [calendar.id],
    }),
    user: one(user, {
      fields: [calendar_participant.user_id],
      references: [user.id],
    }),
  }),
);
