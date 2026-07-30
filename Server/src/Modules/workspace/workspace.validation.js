import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Workspace name is required'),
});

export const inviteMemberSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  role: z.enum(['admin', 'member']).default('member'),
});

export const changeRoleSchema = z.object({
  role: z.enum(['admin', 'member']),
});