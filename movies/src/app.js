import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import 'dotenv/config.js'
import morgan from 'morgan'
import router from './router/index.js'
import error_handler from './middlewares/error.js'
import not_found_handler from './middlewares/notfound.js'
//import sessionFileStore from 'session-file-store'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import inicializePassport from './config/passport.js'

const server = express()
//const FileStore = sessionFileStore(expressSession)
//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
/* server.use(expressSession({
    store: new FileStore({ path: './src/data/sessions',ttl:10000,retries:0  }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
})) */
server.use(expressSession({
    store: mongoStore.create({ mongoUrl: process.env.LINK_MONGO,ttl:10000  }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))
server.use('/',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'))
inicializePassport()
server.use(passport.initialize())
server.use(passport.session())

//endpoints
server.use('/api',router)
server.use(error_handler)
server.use(not_found_handler)

export default server