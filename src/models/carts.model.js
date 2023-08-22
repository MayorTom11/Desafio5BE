import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productsCollection, cartsCollection } from "../constants/index.js";

const cartSchema = new mongoose.Schema({
	products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:productsCollection,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                min:1,
                default:1
            }
        }
    ]
})

cartSchema.plugin(mongoosePaginate)

export const cartsModel = mongoose.model(cartsCollection, cartSchema)