import { z } from 'zod';

export const formSchema = z
  .object({
    // id: z.string().min(2,).max(50),
    name: z.string().min(2).max(50),
    orderType: z.string().min(2).max(50),
    clientDeadline: z.string().min(2).max(50),
    writerDeadline: z.string().min(2).max(50),
    pages: z.string(),
    words: z.number(),
    subject: z.string().min(2).max(50),
    orderNumber: z.string().min(2).max(50),
    topic: z.string().min(2).max(50),
    description: z.string().min(0).max(1024),
    writerFee: z.number().nullable(),
    writerLevel: z.string(),
    writerId: z.string().nullable(),
    amountReceived: z.number(),
    clientFiles: z.any().array().nullable(),
    educationLevel: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
      }),
    orderStatus: z.string(),
    userId: z.string(),
    assignedById: z.string(),
    clientId: z.string(),
    citationStyle: z.string(),
    sources: z.number(),
    spacing: z.string(),
    fileType: z.array(z.string()).nullable(),
  })
  .superRefine(({ writerDeadline, clientDeadline }, ctx) => {
    if (writerDeadline > clientDeadline) {
      ctx.addIssue({
        message:
          'Writer deadline must be sooner than or equal to the client deadline.',
        code: 'custom',
        path: ['writerDeadline'],
      });
    }
  });
