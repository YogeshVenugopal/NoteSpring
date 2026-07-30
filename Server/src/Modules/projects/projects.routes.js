import express from 'express';
import * as projectsController from './projects.controller.js';
import authMiddleware from '../../Middlewares/authMiddleware.js';
import requireRole from '../../Middlewares/requireRole.js';
import validate from '../../Middlewares/validate.js';
import {
  createBoardSchema, addColumnSchema, createCardSchema, updateCardSchema, moveCardSchema,
} from './projects.validation.js';

const router = express.Router({ mergeParams: true }); // same reason as notes/todos — :workspaceId lives on the parent mount

router.use(authMiddleware);
router.use(requireRole('member'));

router.post('/', validate(createBoardSchema), projectsController.createBoard);
router.get('/', projectsController.listBoards);
router.get('/:boardId', projectsController.getBoard);
router.delete('/:boardId', projectsController.removeBoard);

router.post('/:boardId/columns', validate(addColumnSchema), projectsController.addColumn);

router.get('/:boardId/cards', projectsController.listCards);
router.post('/:boardId/cards', validate(createCardSchema), projectsController.createCard);
router.patch('/:boardId/cards/:cardId', validate(updateCardSchema), projectsController.updateCard);
router.patch('/:boardId/cards/:cardId/move', validate(moveCardSchema), projectsController.moveCard);
router.delete('/:boardId/cards/:cardId', projectsController.removeCard);

export default router;