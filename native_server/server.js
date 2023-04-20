const http = require('http')        //requiero el módulo nativo de node para crear servidores
const moment = require('moment')    //requiero el modulo externo de moment para manejar fechas

const server = http.createServer(   //creo un servidor
    (req,res) => res.end('WELCOME TO MY SERVER')                            //defino la callback para "la vista" del servidor
)

const PORT = 8080                   //defino el puerto donde se va a levantar el servidor
const callback = () => console.log('server ready on port: '+PORT)   //defino la callback que se va a ejecutar cuando se levante el servidor

server.listen(
    PORT,
    callback
)