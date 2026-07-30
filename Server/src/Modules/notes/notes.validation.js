import { z } from 'zod';

const blockTypeEnum = z.enum([
  'heading1', 'heading2', 'heading3', 'paragraph', 'code',
  'bulletList', 'numberedList', 'todo', 'image', 'quote', 'divider',
]);

export const createNoteSchema = z.object({
  title: z.string().trim().optional(),
});

export const updateTitleSchema = z.object({
  title: z.string().trim().min(1, 'Title cannot be empty'),
});

export const addBlockSchema = z.object({
  type: blockTypeEnum,
  content: z.string().default(''),
  meta: z.record(z.any()).optional(),
});

export const updateBlockSchema = z.object({
  type: blockTypeEnum.optional(),
  content: z.string().optional(),
  meta: z.record(z.any()).optional(),
});

export const reorderBlocksSchema = z.object({
  blockIds: z.array(z.string()).min(1, 'blockIds cannot be empty'),
});