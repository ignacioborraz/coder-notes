import { model,Schema } from "mongoose";

let collection = 'pizzas'
let schema = new Schema({
    name: { type:String,required:true },
    size: { 
        type:String,
        enum:['small','medium','large'],
        default:'medium'
    },
    quantity: { type:Number,required:true },
    price: { type:Number,required:true },
    date: { type:Date }
})

let Pizza = model(collection,schema)
export default Pizza