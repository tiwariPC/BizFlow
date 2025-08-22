import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  decimal,
  boolean,
  date,
  json,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('tier3'), // tier1, tier2, tier3
  tier: text('tier').notNull().default('tier3'), // tier1, tier2, tier3
  organizationId: varchar('organization_id').references(() => organizations.id), // For tier3 users
  parentUserId: varchar('parent_user_id').references(() => users.id), // For tier3 users
  permissions: json('permissions'), // JSON object for role-based permissions
  status: text('status').notNull().default('active'), // active, inactive, suspended
  createdAt: timestamp('created_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

// Access Tokens for temporary module access
export const accessTokens = pgTable('access_tokens', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  token: text('token').notNull().unique(), // Unique access token
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  grantedBy: varchar('granted_by')
    .notNull()
    .references(() => users.id), // Who granted the access
  modules: text('modules').array().notNull(), // Array of module names (e.g., ['hr', 'team_management'])
  permissions: json('permissions'), // Specific permissions for the modules
  expiresAt: timestamp('expires_at').notNull(), // When the token expires
  isActive: boolean('is_active').default(true), // Can be deactivated before expiry
  usageCount: integer('usage_count').default(0), // Track how many times used
  maxUsage: integer('max_usage'), // Optional: limit number of uses
  description: text('description'), // Reason for granting access
  createdAt: timestamp('created_at').defaultNow(),
  lastUsedAt: timestamp('last_used_at'),
});

export const servicePackages = pgTable('service_packages', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  setupTime: text('setup_time').notNull(),
  compliance: text('compliance').notNull(),
  icon: text('icon').notNull(),
  features: text('features').array().notNull(),
  popular: boolean('popular').default(false),
});

export const orders = pgTable('orders', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  packageId: varchar('package_id')
    .notNull()
    .references(() => servicePackages.id),
  status: text('status').notNull().default('pending'), // pending, processing, completed, cancelled
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  notes: text('notes'),
});

export const questionnaires = pgTable('questionnaires', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id),
  answers: text('answers').notNull(), // JSON string of answers
  recommendation: varchar('recommendation').references(() => servicePackages.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Organizations (Tier 2)
export const organizations = pgTable('organizations', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  displayName: text('display_name'),
  type: text('type').notNull(), // business, ngo, government, educational
  legalType: text('legal_type'), // e.g., sole_prop, partnership, llp, opc, pvt_ltd, public_ltd
  registrationNumber: text('registration_number'), // CIN/LLPIN as applicable
  gstin: text('gstin'),
  pan: text('pan'),
  incorporationDate: date('incorporation_date'),
  address: json('address'), // {line1, line2, city, state, pincode, country}
  contactPerson: text('contact_person'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  website: text('website'),
  industry: text('industry'),
  employeeCount: integer('employee_count'),
  subscriptionPlan: text('subscription_plan').default('basic'), // basic, professional, enterprise
  status: text('status').notNull().default('active'), // active, inactive, suspended
  ownerId: varchar('owner_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Companies (Legacy - will be migrated to organizations)
export const companies = pgTable('companies', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  legalType: text('legal_type').notNull(), // e.g., sole_prop, partnership, llp, opc, pvt_ltd, public_ltd
  registrationNumber: text('registration_number'), // CIN/LLPIN as applicable
  gstin: text('gstin'),
  pan: text('pan'),
  incorporationDate: date('incorporation_date'),
  address: json('address'), // {line1, line2, city, state, pincode}
  ownerId: varchar('owner_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertAccessTokenSchema = createInsertSchema(accessTokens).omit({
  id: true,
  token: true,
  createdAt: true,
  lastUsedAt: true,
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

export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// User registration schema
export const userRegistrationSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  role: z.enum(['tier1', 'tier2', 'tier3']).default('tier3'),
  organizationId: z.string().optional(),
  parentUserId: z.string().optional(),
});

// Access token creation schema
export const createAccessTokenSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  modules: z.array(z.string()).min(1, 'At least one module is required'),
  permissions: z.record(z.any()).optional(),
  expiresAt: z.string().datetime(), // ISO string
  maxUsage: z.number().optional(),
  description: z.string().optional(),
});

// Access token validation schema
export const validateAccessTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  module: z.string().min(1, 'Module is required'),
});

// Organization registration schema
export const organizationRegistrationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  displayName: z.string().optional(),
  type: z.enum(['business', 'ngo', 'government', 'educational']),
  legalType: z.string().optional(),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactEmail: z.string().email('Invalid contact email'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  address: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    country: z.string().default('India'),
  }),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type AccessToken = typeof accessTokens.$inferSelect;
export type InsertAccessToken = z.infer<typeof insertAccessTokenSchema>;
export type CreateAccessToken = z.infer<typeof createAccessTokenSchema>;
export type ValidateAccessToken = z.infer<typeof validateAccessTokenSchema>;
export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;
export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Questionnaire = typeof questionnaires.$inferSelect;
export type InsertQuestionnaire = z.infer<typeof insertQuestionnaireSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

// Module definitions for access control
export const AVAILABLE_MODULES = [
  'hr',
  'team_management',
  'finance',
  'compliance',
  'marketing',
  'sales',
  'inventory',
  'projects',
  'analytics',
  'settings',
] as const;

export type Module = typeof AVAILABLE_MODULES[number];
