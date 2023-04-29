const not_found_handler = (error, req, res, next) => {
    console.error(error.stack)
    return res.json({
        status: 404,
        method: req.method,
        path: req.url,
        response: 'not found'
    })
}

export default not_found_handler