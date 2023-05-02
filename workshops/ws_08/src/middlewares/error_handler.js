const error_handler = (error, req, res, next) => {
	console.error(error.stack)
	return res.status(500).json({
		status: 500,
		method: req.method,
        path: req.url,
		response: error.message
	})
}

export default error_handler