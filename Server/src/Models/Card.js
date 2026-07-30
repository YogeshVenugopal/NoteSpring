import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
    column: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: String,
    order: { type: Number, required: true },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    labels: [String],
    dueDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

cardSchema.index({ board: 1, column: 1, order: 1 });

const Card = mongoose.model('Card', cardSchema);
export default Card;