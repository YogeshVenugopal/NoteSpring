import mongoose from 'mongoose';

const subTaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
},{
    _id:true
})

const todoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isCompleted:{
        type:String,
        default: false,
    },
    priority:{
        type: String,
        enum:["low", "medium", "high"],
        default: 'medium'
    },
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        },
    ],
    dueDate: Date,
    subTask:[subTaskSchema]

})