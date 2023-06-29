export default (req, res, next) => {
	console.log(req.user);
	if (req.user.role===1) {
		return next()
	}
	return res.status(401).json({
		success: false,
		message: 'error de autorización!'
	})
}