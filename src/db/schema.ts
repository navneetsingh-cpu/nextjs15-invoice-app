import { AVAILABLE_STATUSES } from "@/data/invoices";
import { pgTable, pgEnum, serial, timestamp, integer, text } from "drizzle-orm/pg-core";

export type Status = typeof AVAILABLE_STATUSES[number]['id'];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id);
export const statusEnum = pgEnum('status', statuses as [Status, ...Array<Status>]);

export const Invoices = pgTable("invoices", {
    id: serial('id').primaryKey().notNull(),
    createTs: timestamp('createTs').defaultNow().notNull(),
    value: integer('value').notNull(),
    description: text('description').notNull(),
    userId: text('userId').notNull(),
    status: statusEnum('status').notNull(),
});