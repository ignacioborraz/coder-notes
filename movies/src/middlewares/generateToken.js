import jwt from 'jsonwebtoken'

export default (req,res,next) => {
    req.token = jwt.sign(
        { email:req.body.email },
        process.env.SECRET,
        { expiresIn:60*60*24 }
    )
    return next()
}