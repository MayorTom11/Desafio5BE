import mongoose from "mongoose"

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin","usuario"],
    }
})

export const usersModel = mongoose.model(usersCollection, userSchema)