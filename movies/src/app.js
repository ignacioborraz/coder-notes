import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import router from './router/index.js'
import error_handler from './middlewares/error.js'
import not_found_handler from './middlewares/notfound.js'

const server = express()

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use('/public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))

//endpoints
server.use('/api',router)
server.use(error_handler)
server.use(not_found_handler)

export default server