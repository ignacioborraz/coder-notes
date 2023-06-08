import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

let collection = 'movies'
let schema = new Schema({
    title: { type:String,required:true },
    capacity: { type:Number,required:true },
    price: { type:Number,required:true,index:true }
})

schema.plugin(mongoosePaginate)
let Movie = model(collection,schema)
export default Movie