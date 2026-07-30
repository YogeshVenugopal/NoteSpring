import { z } from 'zod';
import { objectId } from '../../Utils/objectId.js';

export const createBoardSchema = z.object({
  name: z.string().trim().min(1, 'Board name is required'),
});

export const addColumnSchema = z.object({
  name: z.string().trim().min(1, 'Column name is required'),
});

export const createCardSchema = z.object({
  columnId:    objectId,
  title:       z.string().trim().min(1, 'Card title is required'),
  description: z.string().optional(),
});

export const updateCardSchema = z.object({
  title:       z.string().trim().min(1).optional(),
  description: z.string().optional(),
  dueDate:     z.coerce.date().optional(),
  labels:      z.array(z.string()).optional(),
  assignees:   z.array(objectId).optional(),
});

export const moveCardSchema = z.object({
  toColumnId:   objectId,
  beforeCardId: objectId.nullable().optional(), // the card that should end up just above this one
  afterCardId:  objectId.nullable().optional(), // the card that should end up just below this one
});