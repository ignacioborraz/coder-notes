import User from '../models/User.js'

export default async function userExists(req, res, next) {
	let one = await User.findOne({ email:req.body.email },'email password -_id')
	if (one) {
		return res.status(400).json({
			success: false,
			message: 'user exists!'
		})
		
	}
	return next()
}