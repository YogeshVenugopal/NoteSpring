import Note from '../../Models/Note.js';
import ApiError from '../../Utils/ApiError.js';

export const createNote = async ({ workspaceId, title, createdBy }) => {
  return Note.create({
    workspace: workspaceId,
    title: title || 'Untitled',
    blocks: [{ type: 'paragraph', content: '' }], // start with one empty block, not zero
    createdBy,
    lastEditedBy: createdBy,
  });
};

export const listNotes = async (workspaceId) =>
  Note.find({ workspace: workspaceId }).select('-blocks').sort({ updatedAt: -1 });

export const getNote = async (workspaceId, noteId) => {
  const note = await Note.findOne({ _id: noteId, workspace: workspaceId });
  if (!note) throw new ApiError(404, 'Note not found');
  return note;
};

export const updateTitle = async ({ workspaceId, noteId, title, editedBy }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, workspace: workspaceId },
    { title, lastEditedBy: editedBy },
    { new: true }
  );
  if (!note) throw new ApiError(404, 'Note not found');
  return note;
};

export const removeNote = async (workspaceId, noteId) => {
  const result = await Note.findOneAndDelete({ _id: noteId, workspace: workspaceId });
  if (!result) throw new ApiError(404, 'Note not found');
};

export const addBlock = async ({ workspaceId, noteId, block, editedBy }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, workspace: workspaceId },
    { $push: { blocks: block }, lastEditedBy: editedBy },
    { new: true }
  );
  if (!note) throw new ApiError(404, 'Note not found');
  return note;
};

export const updateBlock = async ({ workspaceId, noteId, blockId, changes, editedBy }) => {
  const setOps = { lastEditedBy: editedBy };
  if (changes.content !== undefined) setOps['blocks.$.content'] = changes.content;
  if (changes.meta !== undefined) setOps['blocks.$.meta'] = changes.meta;
  if (changes.type !== undefined) setOps['blocks.$.type'] = changes.type;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, workspace: workspaceId, 'blocks._id': blockId }, 
    { $set: setOps },
    { new: true }
  );
  if (!note) throw new ApiError(404, 'Note or block not found');
  return note;
};

export const deleteBlock = async ({ workspaceId, noteId, blockId, editedBy }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, workspace: workspaceId },
    { $pull: { blocks: { _id: blockId } }, lastEditedBy: editedBy },
    { new: true }
  );
  if (!note) throw new ApiError(404, 'Note not found');
  return note;
};

export const reorderBlocks = async ({ workspaceId, noteId, blockIds, editedBy }) => {
  const note = await Note.findOne({ _id: noteId, workspace: workspaceId });
  if (!note) throw new ApiError(404, 'Note not found');

  const blocksById = new Map(note.blocks.map((b) => [b._id.toString(), b]));
  const validReorder = blockIds.length === note.blocks.length && blockIds.every((id) => blocksById.has(id));
  if (!validReorder) {
    throw new ApiError(400, "blockIds must match the note's existing blocks exactly, just reordered");
  }

  note.blocks = blockIds.map((id) => blocksById.get(id));
  note.lastEditedBy = editedBy;
  await note.save();
  return note;
};