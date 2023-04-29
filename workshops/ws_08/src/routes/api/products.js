import { Router } from "express"

const router = Router()

router.get('/',(req,res)=> {
    let products /* logica para obtener productos */
    res.json({ products })
})
router.get('/:pid',(req,res)=> {
    let product /* logica para obtener un producto */
    res.json({ product })
})

export default router