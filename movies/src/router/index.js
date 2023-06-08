import { Router } from "express";
import movies_router from "./movies.js";
import pizzas_router from "./pizzas.js"
import carts_router from "./carts.js"
import cookies_router from "./cookies.js"

const router = Router()

router.use('/movies',movies_router)
router.use('/pizzas',pizzas_router)
router.use('/carts',carts_router)
router.use('/cookies',cookies_router)

export default router