//modules, files & middlewares
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'

const app = express()


//middlewares
app.use('/public',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',router)
app.use(error_handler)
app.use(not_found_handler)

export default app