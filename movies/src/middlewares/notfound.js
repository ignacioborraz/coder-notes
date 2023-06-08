const not_found_handler = (req,res,next) => {
    return res.status(404).json({
        success: false,
        message: `${req.method} ${req.url} not found`
    })
}

export default not_found_handler