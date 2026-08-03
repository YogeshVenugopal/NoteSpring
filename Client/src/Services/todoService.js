import api from './api';

export const getTodos = (wsId, params) => api.get(`/workspaces/${wsId}/todos`, { params });
export const createTodo = (wsId, data) => api.post(`/workspaces/${wsId}/todos`, data);
export const updateTodo = (wsId, id, data) => api.patch(`/workspaces/${wsId}/todos/${id}`, data);
export const setCompleted = (wsId, id, completed) =>
  api.patch(`/workspaces/${wsId}/todos/${id}/complete`, { completed });
export const deleteTodo = (wsId, id) => api.delete(`/workspaces/${wsId}/todos/${id}`);  