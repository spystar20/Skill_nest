import mongoose from "mongoose";

export const ConnectDB = async()=>{
try{
await mongoose.connect(process.env.MONGO_URI)
}catch(err){
console.log(err,"error log")
process.exit(1)
}
}
