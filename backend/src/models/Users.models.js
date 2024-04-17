import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            min:6,
            max:13,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        todos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }],
        date:{
            type:Date,
            default:Date.now
        }
    },
    {timestamps:true}
);

export const User = mongoose.model("User",userSchema);