import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type:String,required:true
    },email:{
        type:String,required:true,unique:true
    },password:{
        type:String,required:function () {
            return this.provider === "local"
        },unique:true
    },isEmailVerified:{
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