import { Router } from "express"

const cookies_router = Router()

//SET
cookies_router.get('/set',async(req,res,next)=> {
    try {
        return res.status(200).cookie('clave','valor',{ maxAge:100000 }).json({
            success:true,
            message: 'cookie seteada'
        })
    } catch (error) {
        next(error)
    }
})
//GET
cookies_router.get('/get',async(req,res,next)=> {
    try {
        return res.status(200).json(req.cookies)
    } catch (error) {
        next(error)
    }
})
//DELETE
cookies_router.get('/delete',async(req,res,next)=> {
    try {
        return res.status(200).clearCookie('clave').json({
            success:true,
            message: 'cookie borrada'
        })
    } catch (error) {
        next(error)
    }
})
//SET SIGNED
cookies_router.post('/signed/set',async(req,res,next)=> {
    try {
        return res.status(200).cookie('mail',req.body.mail,{ maxAge:100000,signed:true }).json({
            success:true,
            message: 'cookie seteada'
        })
    } catch (error) {
        next(error)
    }
})
//GET SIGNED
cookies_router.get('/signed/get',async(req,res,next)=> {
    try {
        return res.status(200).json(req.signedCookies)
    } catch (error) {
        next(error)
    }
})

export default cookies_router