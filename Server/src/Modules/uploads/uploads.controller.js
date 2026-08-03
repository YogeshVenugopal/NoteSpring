// uploads.controller.js
import { randomUUID } from 'crypto';
import * as imageService from '../../Services/imageService.js';
import * as storageService from '../../Services/storageService.js';
import ApiError from '../../Utils/ApiError.js';
import asyncHandler from '../../Utils/asyncHandler.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');

  const { mainBuffer, thumbnailBuffer, width, height } = await imageService.processImage(req.file.buffer);

  const id = randomUUID();
  const [url, thumbnailUrl] = await Promise.all([
    storageService.uploadBuffer(mainBuffer, `workspaces/${req.params.workspaceId}/${id}.webp`, 'image/webp'),
    storageService.uploadBuffer(thumbnailBuffer, `workspaces/${req.params.workspaceId}/${id}-thumb.webp`, 'image/webp'),
  ]);

  res.status(201).json({ url, thumbnailUrl, width, height });
});