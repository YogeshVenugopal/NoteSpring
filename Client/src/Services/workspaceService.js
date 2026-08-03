import api from './api';

export const getMyWorkspaces = () => api.get('/workspaces');
export const createWorkspace = (name) => api.post('/workspaces', { name });
export const getMembers = (id) => api.get(`/workspaces/${id}/members`);
export const inviteMember = (id, email, role = 'member') =>
  api.post(`/workspaces/${id}/invite`, { email, role });