require('dotenv').config()

const express = require('express')
const app = express()

const logger = require('morgan')

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/', async(_req, res) => {
    res.status(200).json({
        env: process.env.ENVIROMENT || undefined,
        port: process.env.PORT || 8000
    })
})
app.use('/api', router)
app.use(errorHandler)
app.use(logger('dev'))

module.exports = app