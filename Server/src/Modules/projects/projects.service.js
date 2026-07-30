import Board from '../../Models/Board.js';
import Card from '../../Models/Card.js';
import Membership from '../../Models/Membership.js';
import ApiError from '../../Utils/ApiError.js';

const DEFAULT_COLUMNS = ['To Do', 'In Progress', 'Done'];

export const createBoard = async ({ workspaceId, name, createdBy }) => {
  const columns = DEFAULT_COLUMNS.map((colName, i) => ({ name: colName, order: i }));
  return Board.create({ workspace: workspaceId, name, columns, createdBy });
};

export const listBoards = async (workspaceId) =>
  Board.find({ workspace: workspaceId }).sort({ createdAt: -1 });

export const getBoard = async (workspaceId, boardId) => {
  const board = await Board.findOne({ _id: boardId, workspace: workspaceId });
  if (!board) throw new ApiError(404, 'Board not found');
  return board;
};

export const removeBoard = async (workspaceId, boardId) => {
  const board = await Board.findOneAndDelete({ _id: boardId, workspace: workspaceId });
  if (!board) throw new ApiError(404, 'Board not found');
  await Card.deleteMany({ board: boardId }); // no foreign-key cascade in MongoDB — clean up manually
};

export const addColumn = async ({ workspaceId, boardId, name }) => {
  const board = await Board.findOne({ _id: boardId, workspace: workspaceId });
  if (!board) throw new ApiError(404, 'Board not found');

  const nextOrder = board.columns.length ? Math.max(...board.columns.map((c) => c.order)) + 1 : 0;
  board.columns.push({ name, order: nextOrder });
  await board.save();
  return board;
};

const assertAssigneesAreMembers = async (workspaceId, assigneeIds = []) => {
  if (!assigneeIds.length) return;
  const activeCount = await Membership.countDocuments({
    workspace: workspaceId,
    user: { $in: assigneeIds },
    status: 'active',
  });
  if (activeCount !== assigneeIds.length) {
    throw new ApiError(400, 'All assignees must be active members of this workspace');
  }
};

export const listCards = async (boardId) =>
  Card.find({ board: boardId }).sort({ column: 1, order: 1 });
  // flat list, sorted by column then position — the frontend groups these under board.columns itself

export const createCard = async ({ workspaceId, boardId, columnId, title, description, createdBy }) => {
  const board = await Board.findOne({ _id: boardId, workspace: workspaceId });
  if (!board) throw new ApiError(404, 'Board not found');
  if (!board.columns.id(columnId)) throw new ApiError(404, 'Column not found on this board'); // .id() — Mongoose's built-in subdocument lookup by _id

  const lastCard = await Card.findOne({ board: boardId, column: columnId }).sort({ order: -1 });
  const order = lastCard ? lastCard.order + 1 : 1;

  return Card.create({ board: boardId, column: columnId, title, description, order, createdBy });
};

export const updateCard = async ({ boardId, cardId, changes }) => {
  if (changes.assignees) {
    const board = await Board.findById(boardId);
    await assertAssigneesAreMembers(board.workspace, changes.assignees);
  }

  const card = await Card.findOneAndUpdate({ _id: cardId, board: boardId }, changes, { new: true });
  if (!card) throw new ApiError(404, 'Card not found');
  return card;
};

export const removeCard = async (boardId, cardId) => {
  const result = await Card.findOneAndDelete({ _id: cardId, board: boardId });
  if (!result) throw new ApiError(404, 'Card not found');
};

// The interesting one — drag-and-drop, without renumbering the whole column.
export const moveCard = async ({ boardId, cardId, toColumnId, beforeCardId, afterCardId }) => {
  const board = await Board.findById(boardId);
  if (!board) throw new ApiError(404, 'Board not found');
  if (!board.columns.id(toColumnId)) throw new ApiError(404, 'Target column not found on this board');

  const [beforeCard, afterCard] = await Promise.all([
    beforeCardId ? Card.findOne({ _id: beforeCardId, board: boardId, column: toColumnId }) : null,
    afterCardId ? Card.findOne({ _id: afterCardId, board: boardId, column: toColumnId }) : null,
  ]);

  let newOrder;
  if (beforeCard && afterCard) {
    newOrder = (beforeCard.order + afterCard.order) / 2; // dropped between two existing cards
  } else if (afterCard) {
    newOrder = afterCard.order - 1;   // dropped at the very top of the column
  } else if (beforeCard) {
    newOrder = beforeCard.order + 1;  // dropped at the very bottom of the column
  } else {
    newOrder = 1;                     // dropped into an empty column
  }

  const card = await Card.findOneAndUpdate(
    { _id: cardId, board: boardId },
    { column: toColumnId, order: newOrder },
    { new: true }
  );
  if (!card) throw new ApiError(404, 'Card not found');
  return card;
};