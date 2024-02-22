import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const orderSchema = z.object({
  id: z.string(),
  orderType: z.string(),
  writerId: z.string().nullable(),
  name: z.string(),
  topic: z.string(),
  description: z.string(),
  subject: z.string(),
  pages: z.number(),
  words: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  clientDeadline: z.string(),
  writerDeadline: z.string().nullable(),
  amountReceived: z.number().nullable(),
  educationLevel: z.string(),
  orderStatus: z.string().default('NEW'),
  writerRating: z.number().nullable(),
  citationStyle: z.string().nullable().default('MLA'),
  spacing: z.string().nullable().default('DOUBLE'),
  sources: z.number(),
  userId: z.string().nullable(),
  assignedById: z.string().nullable(),
  clientId: z.string().nullable(),
  writerFee: z.number().nullable(),
  isArchived: z.boolean().default(false),
  files: z.string().array().optional(), // Assuming File[] is an array of strings representing file paths
  submission: z.string().optional(), // Replace with the actual type of submission if available
});

export type Order = z.infer<typeof orderSchema>;
