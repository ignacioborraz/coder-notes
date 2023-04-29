const http = require('http')
const moment = require('moment')

const server = http.createServer(
    (req,res)=> res.end('welcome to my API')
)

const current_date = moment().format('MMMM Do YYYY, h:mm:ss a')
const ready = ()=> console.log('server ready at '+current_date)
const PORT = 8080

server.listen(PORT,ready)