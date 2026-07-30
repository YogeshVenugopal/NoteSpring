import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
        index: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    notes: String,
    dueDate: Date,
    priority:{
        type: String,
        enum:['high','low','medium'],
        default:"medium"
    },
    completed:{
        type: Boolean,
        default: false
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;