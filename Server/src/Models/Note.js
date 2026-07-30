import mongoose from 'mongoose';

const blockSchema = mongoose.Schema({
    type:{
        type: String,
        enum: ['heading1','heading2','heading3','paragraph','code','bulletList','numberedList','todo','image','quote','divider'],
        required: true
    },
    content:{
        type: String,
        default: ''
    },
    meta:{
        type: mongoose.Schema.Types.Mixed,
        default:{}
    }
},{
    _id: true
})

const noteSchema = new mongoose.Schema({
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
        index: true
    },
    title:{
        type: String,
        default: 'Untitle',
        trim: true,
    },
    block:[blockSchema],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    lastEditBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{timestamps:true});

const Notes = mongoose.model('Notes', noteSchema);
export default Notes;