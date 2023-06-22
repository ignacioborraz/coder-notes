import { Router } from "express";
import movies_router from "./movies.js";
import pizzas_router from "./pizzas.js"
import carts_router from "./carts.js"
import cookies_router from "./cookies.js"
import sessions_router from "./sessions.js"
import auth_router from "./auth.js";

const router = Router()

router.use('/auth',auth_router)
router.use('/movies',movies_router)
router.use('/pizzas',pizzas_router)
router.use('/carts',carts_router)
router.use('/cookies',cookies_router)
router.use('/sessions',sessions_router)

export default router