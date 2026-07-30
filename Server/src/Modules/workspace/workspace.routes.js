import express from 'express';
import * as workspaceController from './workspace.controller.js';
import authMiddleware from '../../Middlewares/authMiddleware.js';
import requireRole from '../../Middlewares/requireRole.js';
import validate from '../../Middlewares/validate.js';
import { createWorkspaceSchema, inviteMemberSchema, changeRoleSchema } from './workspace.validation.js';

const router = express.Router();

router.use(authMiddleware); // every route below needs a logged-in user

router.post('/', validate(createWorkspaceSchema), workspaceController.create);
router.get('/', workspaceController.listMine);
router.get('/invites', workspaceController.listMyInvites);
router.post('/invites/:membershipId/accept', workspaceController.acceptInvite);

router.post(
  '/:workspaceId/invite',
  requireRole('admin'),
  validate(inviteMemberSchema),
  workspaceController.invite
);
router.get('/:workspaceId/members', requireRole('member'), workspaceController.listMembers);
router.patch(
  '/:workspaceId/members/:membershipId',
  requireRole('admin'),
  validate(changeRoleSchema),
  workspaceController.changeRole
);
router.delete(
  '/:workspaceId/members/:membershipId',
  requireRole('admin'),
  workspaceController.removeMember
);

export default router;