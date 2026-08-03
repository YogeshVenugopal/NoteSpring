import multer from 'multer';
import ApiError from '../Utils/ApiError.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const upload = multer({
    storage: multer.memoryStorage(),
    limits : {
        fileSize: 8 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new ApiError('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.', 400), false);
        }
        cb(null, true);
    }
})

export default upload;