const http = require('http')        //requiero el módulo nativo de node para crear servidores
const moment = require('moment')    //requiero el modulo externo de moment para manejar fechas

//segun la doc del modulo, primero defino fecha
let currentDate = moment()
//segundo valido la fecha
let validCurrentDate = currentDate.isValid()
//console.log(validCurrentDate)
//luego le doy formato a la fecha
let formatCurrentDate = currentDate.format("MMM Do YY")
//console.log(currentDate)
//defino la fecha
let bornDate = moment('19900709')
//valido
let validBornDate = bornDate.isValid()
//console.log(validBornDate)
//doy formato
let formatBornDate = bornDate.format("MMM Do YY")
//console.log(bornDate)

let days = currentDate.diff(bornDate,'days')/1000
console.log(days)

const server = http.createServer(   //creo un servidor
    (req,res) => res.end(`hoy tenes ${days} dias de edad!`)                            //defino la callback para "la vista" del servidor
)

const PORT = 8080                   //defino el puerto donde se va a levantar el servidor
const callback = () => console.log('server ready on port: '+PORT)   //defino la callback que se va a ejecutar cuando se levante el servidor

server.listen(
    PORT,
    callback
)