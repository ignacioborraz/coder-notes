const app = require('./app')
const { Server } = require('socket.io')
const Message = require('./src/models/Message')
const generateUser = require('./src/daos/users.faker')
const normalizeMessages = require('./src/utils/normalizr')

const PORT = process.env.PORT || 8000
app.set('port',PORT)

const httpServer = app.listen(app.get('port'), () =>
    console.log('SERVER READY ON PORT: '+app.get('port'))
)

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    //console.log(socket) //para ver propiedades y métodos disponibles
    console.log(`client ${socket.id} connected`)
    socket.on('message', async(data) => { //on escucha una emisión, la cb maneja lo que recibe
        //en este caso, si viene un objeto con el nuevo mensaje, se emite hacia los clientes los mensajes
        if (typeof data != 'string' ) {
            let newMessage = {
                user: data.user,
                message: data.message
            }
            await Message.create(newMessage)
            let messages = await Message.find().lean().sort({ _id: '-1' }).limit(10)
            socketServer.emit('messageLogs', messages) //socketServer envia a todos los clientes
        }
    })
    socket.on('authenticated', async(userName) => {
        let messages = await Message.find().lean().sort({ _id: '-1' }).limit(10)
        socket.emit('messageLogs', messages) //socket unicamente al cliente que se lo pidio
        let user = {
            ...generateUser(),
            name: userName
        } //el usuario deberia mandar todos los datos, pero estamos practicando faker
        socket.emit('user', user) //socket unicamente al cliente que se lo pidio
        socket.emit('normalizr', normalizeMessages(messages)) //socket unicamente al cliente que se lo pidio
    })
})