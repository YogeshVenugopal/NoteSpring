import mongoose from 'mongoose';
import Todo from '../../Models/Todo.js';
import Membership from '../../Models/Membership.js';
import ApiError from '../../Utils/ApiError.js';

const assertAssigneeIsMember = async (workspaceId, assignedTo) => {
  if (!assignedTo) return; // assigning is optional — nothing to check if it's absent
  const isMember = await Membership.exists({ workspace: workspaceId, user: assignedTo, status: 'active' });
  if (!isMember) throw new ApiError(400, 'assignedTo must be an active member of this workspace');
};

export const createTodo = async ({ workspaceId, data, createdBy }) => {
  await assertAssigneeIsMember(workspaceId, data.assignedTo);
  return Todo.create({ ...data, workspace: workspaceId, createdBy });
};

export const listTodos = async (workspaceId, { completed, assignedTo, sortBy } = {}) => {
  const match = { workspace: new mongoose.Types.ObjectId(workspaceId) };
  if (completed !== undefined) match.completed = completed;
  if (assignedTo) match.assignedTo = new mongoose.Types.ObjectId(assignedTo);

  if (sortBy === 'priority') {
    // 'high' > 'medium' > 'low' isn't alphabetical order, so a plain .sort({priority: -1}) on this
    // enum string sorts it wrong (it'd put "low" before "medium"). Rank each value numerically first.
    return Todo.aggregate([
      { $match: match },
      { $addFields: {
        priorityRank: { $switch: {
          branches: [
            { case: { $eq: ['$priority', 'high'] }, then: 3 },
            { case: { $eq: ['$priority', 'medium'] }, then: 2 },
            { case: { $eq: ['$priority', 'low'] }, then: 1 },
          ],
          default: 0,
        } },
      } },
      { $sort: { priorityRank: -1, dueDate: 1 } },
    ]);
  }

  return Todo.find(match).sort({ dueDate: 1 }); // default: soonest due date first
};

export const getTodo = async (workspaceId, todoId) => {
  const todo = await Todo.findOne({ _id: todoId, workspace: workspaceId });
  if (!todo) throw new ApiError(404, 'Todo not found');
  return todo;
};

export const updateTodo = async ({ workspaceId, todoId, changes }) => {
  if (changes.assignedTo) await assertAssigneeIsMember(workspaceId, changes.assignedTo);

  const todo = await Todo.findOneAndUpdate({ _id: todoId, workspace: workspaceId }, changes, { new: true });
  if (!todo) throw new ApiError(404, 'Todo not found');
  return todo;
};

export const setCompleted = async ({ workspaceId, todoId, completed }) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, workspace: workspaceId },
    { completed },
    { new: true }
  );
  if (!todo) throw new ApiError(404, 'Todo not found');
  return todo;
};

export const removeTodo = async (workspaceId, todoId) => {
  const result = await Todo.findOneAndDelete({ _id: todoId, workspace: workspaceId });
  if (!result) throw new ApiError(404, 'Todo not found');
};