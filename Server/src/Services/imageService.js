import sharp from 'sharp';
import ApiError from '../Utils/ApiError.js';

const MAIN_WIDTH = 1600;
const THUMB_WIDTH = 400;

export const processImage = async (buffer) => {
  try {
    await sharp(buffer).metadata(); // throws if this isn't a real, decodable image — the actual check
  } catch {
    throw new ApiError(400, 'File is not a valid image');
  }

  const [main, thumbnail] = await Promise.all([
    sharp(buffer)
      .resize({ width: MAIN_WIDTH, withoutEnlargement: true }) // never upscale a smaller original
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true }),
    sharp(buffer)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer(),
  ]);

  return {
    mainBuffer: main.data,
    width: main.info.width,
    height: main.info.height,
    thumbnailBuffer: thumbnail,
  };
};