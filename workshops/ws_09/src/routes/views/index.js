import { Router } from "express"

const router = Router()

router.get('/', async(req,res,next)=> {
    try {
        return res.render('index',{
            title: 'index',
            description: 'ESTO VA EN EL MAIN'
        })
    } catch(error) {
        next(error)
    }
})

export default router