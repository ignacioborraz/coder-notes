import { Router } from "express"
import Cart from "../models/Cart.js"
import User from "../models/User.js"
import { Types } from "mongoose"

const carts_router = Router()

//CREATE
carts_router.post('/',async(req,res,next)=> {
    try {
        let one = await Cart.create(req.body)
        return res.status(201).json({
            succes:true,
            message: 'id= '+one._id
        })
    } catch (error) {
        next(error)
    }
})

//READ ALL
carts_router.get('/',async(req,res,next)=> {
    try {
        let all = await Cart.find().select('user_id movie_id -_id')
            .populate('user_id','name -_id')
            .populate('movie_id','title -_id')
        return res.status(200).json({
            success:true,
            response:all
        })
    } catch (error) {
        next(error)
    }
})
//READ CARTS FROM ONE USER
carts_router.get('/users/:uid',async(req,res,next)=> {
    try {
        const uid = req.params.uid
        let all = await Cart.find({ user_id:uid }).select('user_id movie_id -_id')
            //utilizando el middleware PRE no es necesario popular en el endpoint
            //.populate('user_id','name -_id')
            //.populate('movie_id','title -_id')
            //configurar condicional si all no existe
        return res.status(200).json({
            success:true,
            response:all
        })
    } catch (error) {
        next(error)
    }
})
//READ THE BILL FROM ONE USER
carts_router.get('/bills/:uid', async(req,res,next)=> {
    try {
        let all = await Cart.aggregate([
            { $match: { user_id: new Types.ObjectId(req.params.uid) } },
            { $lookup: { from: 'movies', localField: 'movie_id', foreignField: '_id', as: 'movie_id' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$movie_id", 0 ] }, "$$ROOT" ] } } },
            { $set: { total: { $multiply: ['$quantity','$price'] } }},
            { $project: { movie_id: 0, quantity: 0, price: 0, __v: 0, active: false } },
            { $group: { _id:'$user_id', sum: { $sum: '$total' } } },
            { $project: { _id:0,user_id:'$_id',sum:'$sum' } },
            { $merge: { into: 'bills' } }
        ])
        return res.status(200).json({ success: true, response: all })
    } catch (error) {
        next(error)
    }
})
//UPDATE CART
carts_router.put('/:cid',async(req,res,next)=> {
    try {
        const cid = req.params.cid
        const data = req.body
        const one = await Cart.findByIdAndUpdate(
            cid,    //id del documento a modificar
            data,   //objeto con las modificaciones a realizar
            { new:true }    //por default new está en false y NO DEVUELVE el objeto modificado
        ).populate('user_id','name -_id')
        return res.status(200).json({
            success: true,
            response: one
        })
    } catch (error) {
       next(error)
    }
})

//UPDATE CART FROM ONE USER
carts_router.put('/users/:uid',async(req,res,next)=>{
    try {
        const uid = req.params.uid
        const all = await Cart.updateMany({ user_id:uid },{ active:false })
        return res.status(200).json({
            success:true,
            response:all
        })
    } catch (error) {
        next(error)
    }
})

//DESTROY
carts_router.delete('/:cid',async(req,res,next)=> {
    try {
        const cid = req.params.cid
        let one = await Cart.deleteOne({ _id:cid })
        return res.status(200).json({
            succes:true,
            response:one
        })
    } catch (error) {
        next(error)
    }
})

export default carts_router