import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("customer"), // customer, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const servicePackages = pgTable("service_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  setupTime: text("setup_time").notNull(),
  compliance: text("compliance").notNull(),
  icon: text("icon").notNull(),
  features: text("features").array().notNull(),
  popular: boolean("popular").default(false),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  packageId: varchar("package_id").notNull().references(() => servicePackages.id),
  status: text("status").notNull().default("pending"), // pending, processing, completed, cancelled
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  notes: text("notes"),
});

export const questionnaires = pgTable("questionnaires", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  answers: text("answers").notNull(), // JSON string of answers
  recommendation: varchar("recommendation").references(() => servicePackages.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertServicePackageSchema = createInsertSchema(servicePackages).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertQuestionnaireSchema = createInsertSchema(questionnaires).omit({
  id: true,
  createdAt: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;
export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Questionnaire = typeof questionnaires.$inferSelect;
export type InsertQuestionnaire = z.infer<typeof insertQuestionnaireSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
