const mongoose = require('mongoose')

let connection = async() => {
    try {
        mongoose.set('strictQuery', 'false')
        mongoose.connect(
            process.env.MONGO,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        return { success: true, message: 'connected to database' }
    } catch (error) {
        console.log(error.message)
        return { success: false, message: error.message }
    }
}

connection()