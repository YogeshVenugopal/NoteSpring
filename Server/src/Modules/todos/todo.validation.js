import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

export const createTodoSchema = z.object({
  title:      z.string().trim().min(1, 'Title is required'),
  notes:      z.string().optional(),
  dueDate:    z.coerce.date().optional(), // coerce: JSON has no Date type, this parses the ISO string
  priority:   z.enum(['low', 'medium', 'high']).optional(),
  assignedTo: objectId.optional(),
});

export const updateTodoSchema = createTodoSchema.partial(); // same shape, every field optional

export const setCompletedSchema = z.object({
  completed: z.boolean(),
});