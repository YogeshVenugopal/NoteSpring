import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    workspace: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    status: {
        type: String,
        enum: ['invited', 'active', 'revoked'],
        default: 'invited'
    },
    invitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joinedAt: Date,
}, { timestamps: true });

membershipSchema.index({ workspace: 1, email: 1 }, { unique: true }); // no duplicate invites
membershipSchema.index({ user: 1, status: 1 });      

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;