import { Router } from "express"
import User from '../models/User.js'
import validatorRegister from "../middlewares/validatorRegister.js"
import validatorSignin from "../middlewares/validatorSignin.js"
import passIs8 from "../middlewares/passIs8.js"
import createHash from '../middlewares/createHash.js'
import isValidPassword from '../middlewares/isValidPassword.js'
import userExists from "../middlewares/userExists.js"
import passport from "passport"
import generateToken from "../middlewares/generateToken.js"

const auth_router = Router()

//REGISTER
auth_router.post('/register',
    validatorRegister,
    passIs8,
    createHash,
    passport.authenticate('register',{ failureRedirect:'/api/auth/fail-register' }),
    (req,res)=> res.status(201).json({
            success: true,
            message: 'user created!',
            passport: req.session.passport,
            user: req.user
    })
)
auth_router.get('/fail-register',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail register!'
}))

//SIGNIN
auth_router.post('/signin',
    validatorSignin,
    passIs8,
    passport.authenticate('signin',{ failureRedirect:'/api/auth/fail-signin' }),
    isValidPassword,
    generateToken,
    (req,res)=> {
        req.session.email = req.user.email
        req.session.role = req.user.role
        return res.status(200).json({
            success: true,
            message: 'user signed in!',
            passport: req.session.passport,
            user: req.user,
            token: req.token
        })
})
auth_router.get('/fail-signin',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail sign in!'
}))

//SIGNOUT
auth_router.post('/signout',async(req,res,next)=>{
    try {
        if (req.session.email) {
            req.session.destroy()
            return res.status(200).json({
                success: true,
                message: 'user signed out!'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'user not found!'
            })
        }
    } catch (error) {
        next(error)
    }
})

//GH REGISTER
auth_router.get('/github',
    passport.authenticate('github',{ scope:['user:email'] }),
    (req,res)=> res.status(201).json({
            success: true,
            message: 'user created!',
            passport: req.session.passport,
            user: req.user
    })
)
auth_router.get('/github/callback',
    passport.authenticate('github',{ failureRedirect:'/api/auth/fail-register' }),
        (req,res)=> {
            req.session.user = req.user
            return res.redirect('/')
    }
)

export default auth_router