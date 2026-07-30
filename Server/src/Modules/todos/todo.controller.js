import * as todosService from './todo.service.js';
import asyncHandler from '../../Utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const todo = await todosService.createTodo({
    workspaceId: req.params.workspaceId,
    data: req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(todo);
});

export const list = asyncHandler(async (req, res) => {
  const { completed, assignedTo, sortBy } = req.query;
  const todos = await todosService.listTodos(req.params.workspaceId, {
    completed: completed === undefined ? undefined : completed === 'true',
    assignedTo: assignedTo === 'me' ? req.user.id : assignedTo, // ?assignedTo=me is a convenience alias
    sortBy,
  });
  res.json(todos);
});

export const getOne = asyncHandler(async (req, res) => {
  res.json(await todosService.getTodo(req.params.workspaceId, req.params.todoId));
});

export const update = asyncHandler(async (req, res) => {
  const todo = await todosService.updateTodo({
    workspaceId: req.params.workspaceId,
    todoId: req.params.todoId,
    changes: req.body,
  });
  res.json(todo);
});

export const setCompleted = asyncHandler(async (req, res) => {
  const todo = await todosService.setCompleted({
    workspaceId: req.params.workspaceId,
    todoId: req.params.todoId,
    completed: req.body.completed,
  });
  res.json(todo);
});

export const remove = asyncHandler(async (req, res) => {
  await todosService.removeTodo(req.params.workspaceId, req.params.todoId);
  res.status(204).send();
});