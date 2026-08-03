// uploads.routes.js
import express from 'express';
import * as uploadsController from './uploads.controller.js';
import authMiddleware from '../../Middlewares/authMiddleware.js';
import requireRole from '../../Middlewares/requireRole.js';
import upload from '../../Middlewares/upload.js';

const router = express.Router({ mergeParams: true }); // same reason as notes/todos/projects

router.use(authMiddleware);
router.use(requireRole('member'));

router.post('/image', upload.single('image'), uploadsController.uploadImage);

export default router;