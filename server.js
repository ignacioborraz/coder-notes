const app = require('./app')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 8000
app.set('port',PORT)

const httpServer = app.listen(app.get('port'), () =>
    console.log('SERVER READY ON PORT: '+app.get('port'))
)

let messages = []
const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    //console.log(socket) //para ver propiedades y métodos disponibles
    console.log(`client ${socket.id} connected`)
    socket.on('message', data => { //on escucha una emisión, la cb maneja lo que recibe
        //en este caso, si viene un objeto con el nuevo mensaje, se emite hacia los clientes los mensajes
        if (typeof data != 'string' ) {
            messages.push(data)
            //console.log(messages)
            let length = messages.length
            if (length > 10) { //muestro siempre 10 mensajes
                socketServer.emit('messageLogs', [...messages].splice(length-10,length))
            } else if (length > 0) {
                socketServer.emit('messageLogs', messages)
            }
        }
    })
    socket.on('authenticated', () => { //on escucha una emisión, la cb maneja lo que recibe
        //en este caso, si existen mensajes al autenticarse, se emite hacia los cleintes los mensajes
        let length = messages.length
        if (length > 10) {
            socketServer.emit('messageLogs', [...messages].splice(length-10,length))
        } else if (length > 0) {
            socketServer.emit('messageLogs', messages)
        }
    })
})