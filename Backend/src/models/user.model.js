import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,required:true
    },lastName:{
        type:String,default:""
    }
    ,email:{
        type:String,required:true,unique:true
    },password:{
        type:String,required:function () {
            return this.provider === "local"
        },unique:true
    },username:{
        type:String,default:""
    },DOB:{
        type:Date,default:''
    },Gender:{
        type:String,default:""
    },Phone:{
        type:String,default:""
    },Location:{
        type:String,default:""
    },Bio:{
        type:String,default:""
    }
    ,isEmailVerified:{
        type:Boolean,
    },resetOTP:{
        type:String
    },resetOTPExpires:{
        type:Date
    },
    googleId:String,
    provider:{
        type:String,default:"local", enum: ["local", "google"],

    },avatar:String,

},{timestamps:true})

export default mongoose.model("user",UserSchema)