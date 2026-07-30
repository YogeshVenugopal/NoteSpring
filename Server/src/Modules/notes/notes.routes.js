import express from 'express';
import * as notesController from './notes.controller.js';
import authMiddleware from '../../Middlewares/authMiddleware.js';
import requireRole from '../../Middlewares/requireRole.js';
import validate from '../../Middlewares/validate.js';
import {
  createNoteSchema, updateTitleSchema, addBlockSchema, updateBlockSchema, reorderBlocksSchema,
} from './notes.validation.js';

const router = express.Router({ mergeParams: true }); // see note below — required for :workspaceId

router.use(authMiddleware);
router.use(requireRole('member')); // any active member can read/write notes

router.post('/', validate(createNoteSchema), notesController.create);
router.get('/', notesController.list);
router.get('/:noteId', notesController.getOne);
router.patch('/:noteId', validate(updateTitleSchema), notesController.updateTitle);
router.delete('/:noteId', notesController.remove);

router.post('/:noteId/blocks', validate(addBlockSchema), notesController.addBlock);
router.patch('/:noteId/blocks/:blockId', validate(updateBlockSchema), notesController.updateBlock);
router.delete('/:noteId/blocks/:blockId', notesController.deleteBlock);
router.patch('/:noteId/reorder', validate(reorderBlocksSchema), notesController.reorderBlocks);

export default router;