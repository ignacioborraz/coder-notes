import { Router } from "express"
import validatorRegister from "../middlewares/validatorRegister.js"
import validatorSignin from "../middlewares/validatorSignin.js"
import passIs8 from "../middlewares/passIs8.js"
import createHash from '../middlewares/createHash.js'
import isValidPassword from '../middlewares/isValidPassword.js'
import passport from "passport"
import generateToken from "../middlewares/generateToken.js"
import passport_call from "../middlewares/passport_call.js"

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
            user: req.user
    })
)
auth_router.get('/fail-register',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail register!'
}))

//SIGNIN
auth_router.post('/login',
    validatorSignin,
    passIs8,
    //passport.authenticate('signin',{ failureRedirect:'/api/auth/fail-signin' }),
    isValidPassword,
    generateToken,
    (req,res)=> {
        return res.status(200)
            .cookie('token',req.token,{maxAge:60*60*1000,httpOnly:true})
            .json({
                success: true,
                message: 'user signed in!'
            }
        )
    }
)
auth_router.get('/fail-signin',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail sign in!'
}))

//SIGNOUT
auth_router.post('/signout',
    passport_call('jwt'),
    async(req,res,next)=>{
        try {
            return res.status(200).clearCookie('token').json({
                success: false,
                message: 'user signed out!'
            })
        } catch (error) {
            next(error)
        }
    }
)

//GH REGISTER
auth_router.get('/github',
    passport.authenticate('github',{ scope:['user:email'] }),
    (req,res)=> res.status(201).json({
            success: true,
            message: 'user created!',
            user: req.user
    })
)
auth_router.get('/github/callback',
    passport.authenticate('github',{ failureRedirect:'/api/auth/fail-register' }),
        (req,res)=> {
            //req.session.user = req.user
            return res.redirect('/')
    }
)

export default auth_router