import app from "./app.js"

const PORT = 8080
const ready = ()=> console.log('http server ready on port '+PORT)

const http_server = app.listen(PORT,ready)