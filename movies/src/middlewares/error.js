const error_handler = (error,req,res,next) => {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: error.message
    })
}

export default error_handler