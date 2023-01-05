require('dotenv').config()
if (process.env.FROM === 'mongo') {
    require('./src/daos/mongo/config')
}

const express = require('express')
const app = express()
const path = require('path')

const logger = require('morgan')

const router = require('./src/routes/index')
const viewsRouter = require('./src/routes/views/index')
const errorHandler = require('./src/middlewares/errorHandler')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))

const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')

app.use(errorHandler)
app.use(logger('dev'))
app.use('/', viewsRouter)
app.use('/api', router)

module.exports = app