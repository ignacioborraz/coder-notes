import { Router } from "express"
import auth from '../middlewares/auth.js'

const sessions_router = Router()

//COUNTER
sessions_router.get('/',async(req,res)=> {
    if (!req.session.counter) {
        req.session.counter = 1
    } else {
        req.session.counter++
    }
    return res.status(200).json({ message: `han ingresado ${req.session.counter} usuarios`})
})
//LOGIN
sessions_router.post('/login',async(req,res,next)=> {
    try {
        const { mail } = req.body
        req.session.mail = mail
        return res.status(200).json({ message: `${req.session.mail} ha iniciado sesión`})
    } catch (error) {
        next()
    }
})
//PRIVATE
sessions_router.get('/private',auth, (req, res) => {
    return res.status(200).json({ message: 'administrador autorizado' })
})
//LOGOUT
sessions_router.post('/logout',async(req,res,next)=> {
    try {
        req.session.destroy()
        return res.status(200).json({ message: `ha cerrado sesión`})
    } catch (error) {
        next()
    }
})

export default sessions_router