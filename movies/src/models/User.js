import { model,Schema } from "mongoose"

let collection = 'users'
let schema = new Schema({
    name: { type:String,required:true },
    email: { type:String,required:true,unique:true,index:true },
    password: { type:String,required:true },
    photo: { type:String,required:true },
    role: { type:Number,default:0 }
})

let User = model(collection,schema)
export default User