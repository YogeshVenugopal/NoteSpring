import api from './api';

export const getNotes = (wsId) => api.get(`/workspaces/${wsId}/notes`);
export const getNote = (wsId, noteId) => api.get(`/workspaces/${wsId}/notes/${noteId}`);
export const createNote = (wsId, title) => api.post(`/workspaces/${wsId}/notes`, { title });
export const updateNoteTitle = (wsId, noteId, title) =>
  api.patch(`/workspaces/${wsId}/notes/${noteId}`, { title });
export const addBlock = (wsId, noteId, block) =>
  api.post(`/workspaces/${wsId}/notes/${noteId}/blocks`, block);
export const updateBlock = (wsId, noteId, blockId, changes) =>
  api.patch(`/workspaces/${wsId}/notes/${noteId}/blocks/${blockId}`, changes);
export const deleteBlock = (wsId, noteId, blockId) =>
  api.delete(`/workspaces/${wsId}/notes/${noteId}/blocks/${blockId}`);
export const reorderBlocks = (wsId, noteId, blockIds) =>
  api.patch(`/workspaces/${wsId}/notes/${noteId}/reorder`, { blockIds });