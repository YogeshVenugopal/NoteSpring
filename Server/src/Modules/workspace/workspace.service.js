import User from '../../Models/User.js';
import Workspace from '../../Models/Workspace.js';
import Membership from '../../Models/Membership.js';
import ApiError from '../../Utils/ApiError.js';
import logger from '../../Utils/logger.js';
import { toSlug } from '../../Utils/slug.js';
import { sendInviteEmail } from '../../Services/emailService.js';

const generateUniqueSlug = async (name) => {
  const base = toSlug(name);
  let slug = base;
  let counter = 1;
  while (await Workspace.exists({ slug })) {
    slug = `${base}-${counter++}`;
  }
  return slug;
};

export const createWorkspace = async ({ name, ownerId }) => {
  const owner = await User.findById(ownerId);
  const slug = await generateUniqueSlug(name);

  const workspace = await Workspace.create({ name, slug, owner: owner._id });

  await Membership.create({
    workspace: workspace._id,
    user: owner._id,
    email: owner.email,
    role: 'admin',      // whoever creates a workspace is its first admin
    status: 'active',
    joinedAt: new Date(),
  });

  logger.info(`Workspace ${workspace._id} created by user ${owner._id}`);
  return workspace;
};

export const listMyWorkspaces = async (userId) => {
  const memberships = await Membership.find({ user: userId, status: 'active' }).populate('workspace');
  return memberships.map((m) => ({ ...m.workspace.toObject(), role: m.role }));
};

export const inviteMember = async ({ workspaceId, email, role, invitedBy }) => {
  const alreadyInvolved = await Membership.findOne({
    workspace: workspaceId,
    email,
    status: { $ne: 'revoked' },
  });
  if (alreadyInvolved) throw new ApiError(409, 'This email is already invited or a member');

  const existingUser = await User.findOne({ email }); // may not have an account yet — that's fine

  const membership = await Membership.create({
    workspace: workspaceId,
    user: existingUser?._id, // null until they register, if they haven't yet
    email,
    role,
    status: 'invited',
    invitedBy,
  });

  await sendInviteEmail({ to: email, workspaceId });
  logger.info(`Invite sent to ${email} for workspace ${workspaceId}`);
  return membership;
};

export const listMembers = async (workspaceId) =>
  Membership.find({ workspace: workspaceId, status: { $ne: 'revoked' } });

export const changeRole = async ({ workspaceId, membershipId, role }) => {
  const membership = await Membership.findOneAndUpdate(
    { _id: membershipId, workspace: workspaceId },
    { role },
    { new: true }
  );
  if (!membership) throw new ApiError(404, 'Membership not found');
  return membership;
};

export const removeMember = async ({ workspaceId, membershipId }) => {
  const membership = await Membership.findOneAndUpdate(
    { _id: membershipId, workspace: workspaceId },
    { status: 'revoked' },
    { new: true }
  );
  if (!membership) throw new ApiError(404, 'Membership not found');
  return membership;
};

// Pending invites for the current user — shown so they can accept or decline
export const listMyInvites = async (userId) =>
  Membership.find({ user: userId, status: 'invited' }).populate('workspace');

export const acceptInvite = async ({ userId, membershipId }) => {
  const membership = await Membership.findOneAndUpdate(
    { _id: membershipId, user: userId, status: 'invited' },
    { status: 'active', joinedAt: new Date() },
    { new: true }
  );
  if (!membership) throw new ApiError(404, 'Invite not found');
  return membership;
};

// Called from auth.service.js right after a new user registers
export const linkPendingInvitesByEmail = async (user) => {
  await Membership.updateMany(
    { email: user.email, status: 'invited', user: null },
    { user: user._id }
  );
};