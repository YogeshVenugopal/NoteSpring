import Membership from '../Models/Membership.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const requireRole = (minRole = 'member') =>
  asyncHandler(async (req, res, next) => {
    const membership = await Membership.findOne({
      workspace: req.params.workspaceId,
      user: req.user.id,
      status: 'active',
    });

    if (!membership) {
      throw new ApiError(403, 'You are not a member of this workspace');
    }
    if (minRole === 'admin' && membership.role !== 'admin') {
      throw new ApiError(403, 'This action requires an admin role');
    }

    req.membership = membership;
    next();
  });

export default requireRole;