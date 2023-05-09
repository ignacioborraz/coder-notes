import { Router } from "express"
import auth_router from "./auth.js"
import products_router from "./products.js"
import carts_router from "./carts.js"

const router = Router()

router.use('/auth',auth_router)
router.use('/products',products_router)
router.use('/carts',carts_router)

export default router