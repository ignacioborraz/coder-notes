import express from "express"

const server = express()

const PORT = process.env.PORT || 8079
const ready = ()=>console.log('ready on port '+PORT);

server.listen(PORT,ready)