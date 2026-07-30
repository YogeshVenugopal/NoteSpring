import logger from '../utils/logger.js';

export const sendInviteEmail = async ({ to, workspaceId }) => {
  // TODO: replace with a real provider (Resend, SendGrid, Postmark, etc.) before shipping.
  // Actually sending email is a separate concern from the invite logic above, so it's
  // intentionally isolated here — swapping providers later means changing only this file.
  logger.info(`[stub] Invite email would be sent to ${to} for workspace ${workspaceId}`);
};