import * as notesService from './notes.service.js';
import asyncHandler from '../../Utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const note = await notesService.createNote({
    workspaceId: req.params.workspaceId,
    title: req.body.title,
    createdBy: req.user.id,
  });
  res.status(201).json(note);
});

export const list = asyncHandler(async (req, res) => {
  res.json(await notesService.listNotes(req.params.workspaceId));
});

export const getOne = asyncHandler(async (req, res) => {
  res.json(await notesService.getNote(req.params.workspaceId, req.params.noteId));
});

export const updateTitle = asyncHandler(async (req, res) => {
  const note = await notesService.updateTitle({
    workspaceId: req.params.workspaceId,
    noteId: req.params.noteId,
    title: req.body.title,
    editedBy: req.user.id,
  });
  res.json(note);
});

export const remove = asyncHandler(async (req, res) => {
  await notesService.removeNote(req.params.workspaceId, req.params.noteId);
  res.status(204).send();
});

export const addBlock = asyncHandler(async (req, res) => {
  const note = await notesService.addBlock({
    workspaceId: req.params.workspaceId,
    noteId: req.params.noteId,
    block: req.body,
    editedBy: req.user.id,
  });
  res.status(201).json(note);
});

export const updateBlock = asyncHandler(async (req, res) => {
  const note = await notesService.updateBlock({
    workspaceId: req.params.workspaceId,
    noteId: req.params.noteId,
    blockId: req.params.blockId,
    changes: req.body,
    editedBy: req.user.id,
  });
  res.json(note);
});

export const deleteBlock = asyncHandler(async (req, res) => {
  const note = await notesService.deleteBlock({
    workspaceId: req.params.workspaceId,
    noteId: req.params.noteId,
    blockId: req.params.blockId,
    editedBy: req.user.id,
  });
  res.json(note);
});

export const reorderBlocks = asyncHandler(async (req, res) => {
  const note = await notesService.reorderBlocks({
    workspaceId: req.params.workspaceId,
    noteId: req.params.noteId,
    blockIds: req.body.blockIds,
    editedBy: req.user.id,
  });
  res.json(note);
});