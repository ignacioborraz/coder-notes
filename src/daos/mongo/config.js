const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO) //MONGO es la uri de conexión
    .then(() => console.log('DATABASE CONNECTED'))
    .catch(err => console.log(err))