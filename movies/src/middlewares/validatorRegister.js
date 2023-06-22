export default function validator_register (req,res,next) {
    const { name,password,email,photo } = req.body
    if (!name || !password || !email || !photo) {
        return res.status(400).json({
            success: false,
            message: 'name, email, password and photo are required'
        })
    } else {
        return next()
    }
}