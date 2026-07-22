import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type: String, 
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    password:{
        type: String,
        required:true,
    },
    isVerified:{
        type: Boolean,
        default:false,
    },
    avatar:{
        type: String,
        default:""
    },
    verifyOtp:{
        type: String,
        select:false,
    },
    verifyOtpExpiresAt:{
        type: Date,
    },
    resetOtp:{
        type: String,
        select:false,
    },
    resetOtpExpiresAt:{
        type: Date,
    },
    refreshToken:{
        type: String,
        select:false,
        default:""
    }
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;

