import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    verifyOtp:{
        type: String,
        default:''
    },
    verifyOtpExpiresAt:{
        type: Number,
        default:0
    },
    isAccountVerified:{
        type: Boolean,
        default: false,
    },
    resetOtp:{
        type: String, 
        default: '',
    },
    resetOtpExpiresAt:{
        type: Number,
        default: 0,
    }
})

const user = mongoose.model('User', userSchema);

export default user;