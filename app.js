require('dotenv').config()

const express = require('express')
const app = express()

const logger = require('morgan')

const router = require('./src/routes/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', async(_req, res) => {
    res.status(200).json({
        enviroment: process.env.NODE_ENV || undefined,
        port: process.env.PORT || 8000
    })
})
app.use(errorHandler)
app.use(logger('dev'))
app.use('/api', router)

module.exports = app