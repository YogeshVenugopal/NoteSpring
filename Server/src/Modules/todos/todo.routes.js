import express from 'express';
import * as todosController from './todo.controller.js';
import authMiddleware from '../../Middlewares/authMiddleware.js';
import requireRole from '../../Middlewares/requireRole.js';
import validate from '../../Middlewares/validate.js';
import { createTodoSchema, updateTodoSchema, setCompletedSchema } from './todo.validation.js';

const router = express.Router({ mergeParams: true }); // same reason as notes.routes.js

router.use(authMiddleware);
router.use(requireRole('member'));

router.post('/', validate(createTodoSchema), todosController.create);
router.get('/', todosController.list);
router.get('/:todoId', todosController.getOne);
router.patch('/:todoId', validate(updateTodoSchema), todosController.update);
router.patch('/:todoId/complete', validate(setCompletedSchema), todosController.setCompleted);
router.delete('/:todoId', todosController.remove);

export default router;