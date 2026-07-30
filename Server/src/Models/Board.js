import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    order: { type: Number, required: true },
}, { _id: true });

const boardSchema = new mongoose.Schema({
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true, index: true },
    name: { type: String, required: true },
    columns: [columnSchema], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;