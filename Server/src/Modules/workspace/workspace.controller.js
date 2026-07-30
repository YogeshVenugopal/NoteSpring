import * as workspaceService from './workspace.service.js';
import asyncHandler from '../../Utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const workspace = await workspaceService.createWorkspace({ name: req.body.name, ownerId: req.user.id });
  res.status(201).json(workspace);
});

export const listMine = asyncHandler(async (req, res) => {
  const workspaces = await workspaceService.listMyWorkspaces(req.user.id);
  res.json(workspaces);
});

export const invite = asyncHandler(async (req, res) => {
  const membership = await workspaceService.inviteMember({
    workspaceId: req.params.workspaceId,
    email: req.body.email,
    role: req.body.role,
    invitedBy: req.user.id,
  });
  res.status(201).json(membership);
});

export const listMembers = asyncHandler(async (req, res) => {
  const members = await workspaceService.listMembers(req.params.workspaceId);
  res.json(members);
});

export const changeRole = asyncHandler(async (req, res) => {
  const membership = await workspaceService.changeRole({
    workspaceId: req.params.workspaceId,
    membershipId: req.params.membershipId,
    role: req.body.role,
  });
  res.json(membership);
});

export const removeMember = asyncHandler(async (req, res) => {
  await workspaceService.removeMember({
    workspaceId: req.params.workspaceId,
    membershipId: req.params.membershipId,
  });
  res.status(204).send();
});

export const listMyInvites = asyncHandler(async (req, res) => {
  const invites = await workspaceService.listMyInvites(req.user.id);
  res.json(invites);
});

export const acceptInvite = asyncHandler(async (req, res) => {
  const membership = await workspaceService.acceptInvite({
    userId: req.user.id,
    membershipId: req.params.membershipId,
  });
  res.json(membership);
});