import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productsCollection } from "../constants/index.js";

const productSchema = new mongoose.Schema({
	title:{
        type:String,
        required:true,
        unique:true
    },
	description:String,
    price:{
        type:Number,
        required:true
    },
    thumbnail:String,
    code:{
        type:String,
        required:true,
        unique:true
    },
    stock:Number,
    category:{
        type:String,
        required:true,
        enum:["Aperitifs","Wines"]
    }
})

productSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollection, productSchema)