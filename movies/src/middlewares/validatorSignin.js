export default function validator_signin (req,res,next) {
    const { password,email } = req.body
    if (!password || !email) {
        return res.status(400).json({
            success: false,
            message: 'password,email are required'
        })
    } else {
        return next()
    }
}