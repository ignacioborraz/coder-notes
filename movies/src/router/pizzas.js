import { Router } from "express";
import Pizza from "../models/Pizza.js";

let pizzas_router = Router()

pizzas_router.get('/', async(req,res,next)=> {
    try {
        let all = await Pizza.aggregate([
            { $match: { size: 'medium' } },
            { $group: { _id:'$name',totalQuantity: { $sum:'$quantity' } } },
            { $sort: { totalQuantity: 1 } },
            { $group: { _id:1,orders: { $push:'$$ROOT'} }},
            { $project: { '_id':0 } },
            { $merge: { into: 'reports' } }
        ])
        return res.status(200).json({ success: true, response: all })
    } catch (error) {
        next(error)
    }
})

export default pizzas_router