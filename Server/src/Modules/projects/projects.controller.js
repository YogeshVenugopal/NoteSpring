import * as projectsService from './projects.service.js';
import asyncHandler from '../../Utils/asyncHandler.js';

export const createBoard = asyncHandler(async (req, res) => {
  const board = await projectsService.createBoard({
    workspaceId: req.params.workspaceId,
    name: req.body.name,
    createdBy: req.user.id,
  });
  res.status(201).json(board);
});

export const listBoards = asyncHandler(async (req, res) => {
  res.json(await projectsService.listBoards(req.params.workspaceId));
});

export const getBoard = asyncHandler(async (req, res) => {
  res.json(await projectsService.getBoard(req.params.workspaceId, req.params.boardId));
});

export const removeBoard = asyncHandler(async (req, res) => {
  await projectsService.removeBoard(req.params.workspaceId, req.params.boardId);
  res.status(204).send();
});

export const addColumn = asyncHandler(async (req, res) => {
  const board = await projectsService.addColumn({
    workspaceId: req.params.workspaceId,
    boardId: req.params.boardId,
    name: req.body.name,
  });
  res.status(201).json(board);
});

export const listCards = asyncHandler(async (req, res) => {
  res.json(await projectsService.listCards(req.params.boardId));
});

export const createCard = asyncHandler(async (req, res) => {
  const card = await projectsService.createCard({
    workspaceId: req.params.workspaceId,
    boardId: req.params.boardId,
    columnId: req.body.columnId,
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id,
  });
  res.status(201).json(card);
});

export const updateCard = asyncHandler(async (req, res) => {
  const card = await projectsService.updateCard({
    boardId: req.params.boardId,
    cardId: req.params.cardId,
    changes: req.body,
  });
  res.json(card);
});

export const removeCard = asyncHandler(async (req, res) => {
  await projectsService.removeCard(req.params.boardId, req.params.cardId);
  res.status(204).send();
});

export const moveCard = asyncHandler(async (req, res) => {
  const card = await projectsService.moveCard({
    boardId: req.params.boardId,
    cardId: req.params.cardId,
    toColumnId: req.body.toColumnId,
    beforeCardId: req.body.beforeCardId,
    afterCardId: req.body.afterCardId,
  });
  res.json(card);
});