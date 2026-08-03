import api from './api';

export const getBoards = (wsId) => api.get(`/workspaces/${wsId}/boards`);
export const getBoard = (wsId, id) => api.get(`/workspaces/${wsId}/boards/${id}`);
export const getCards = (boardId) => api.get(`/workspaces/_/boards/${boardId}/cards`);
export const moveCard = (boardId, cardId, payload) =>
  api.patch(`/workspaces/_/boards/${boardId}/cards/${cardId}/move`, payload);
export const updateCard = (boardId, cardId, data) =>
  api.patch(`/workspaces/_/boards/${boardId}/cards/${cardId}`, data);