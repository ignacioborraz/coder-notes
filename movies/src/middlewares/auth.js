import User from "../models/User.js"
import jwt from "jsonwebtoken"

export default (req, res, next) => {
	const auth = req.headers.authorization
	console.log(auth)
	if (!auth) {
		return res.status(401).json({
			success: false,
			message: 'error de autorización!'
		})
	}
	const token = auth.split(' ')[1]
	jwt.verify(
		token,
		process.env.SECRET,
		async(error,credentials) => {
			if(error) {
				return res.status(401).json({
					success: false,
					message: 'error de autorización!'
				}) 
			}
			let user = await User.findOne({ email:credentials.email })
			req.user = user
			return next()
		}
	)
}