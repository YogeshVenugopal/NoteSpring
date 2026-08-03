import logger from '../Utils/logger.js';

export const uploadBuffer = async (buffer, key, contentType) => {
  // TODO: replace with a real provider (S3, Cloudinary, Backblaze B2, etc.) before shipping.
  logger.info(`[stub] Would upload ${key} (${buffer.length} bytes, ${contentType})`);
  return `https://cdn.example.com/${key}`; // placeholder — a real provider returns the actual public URL
};