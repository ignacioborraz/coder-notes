const socket = io()

let userName
let dataUser
let chatBox = document.getElementById('chatBox')

Swal.fire({ //utilizamos una alerta para autenticar al usuario
    title: "identify yourself",
    input: "text",
    inputValidator: value => {
        return !value && 'write a nick please!'
    },
    allowOutsideClick: false
}).then(result => { //seteamos userName
    userName = result.value
    let txtUsername = document.getElementById('username')    
    txtUsername.innerHTML = `<span>${userName}</span>`    
    socket.emit('authenticated', userName) //emitimos la autenticacion hacia el servidor
})

chatBox.addEventListener('keyup', event => { //capturo el enter de cada texto enviado por los usuarios
    if(event.key == 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', { //emitimos un mensaje hacia el servidor
                user: dataUser, 
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', data => { //recibo la respuesta del servidor para renderizar los mensajes
    let log = document.getElementById('messageLogs')    
    log.innerHTML = data.map(message => `<br><b>${message.user.name}</b>: ${message.message}`).join('')
    user = data.user
})

socket.on('user', data => dataUser = data)

const userSchema = new normalizr.schema.Entity("user", {}, { idAttribute: 'nick' })
const messageSchema = new normalizr.schema.Entity("message", { "user": userSchema }, { idAttribute: '_id' })
const messagesSchema = new normalizr.schema.Entity("messages", { "messages": [messageSchema] })

socket.on('normalizr', (data) => {
    const normLength = JSON.stringify(data).length
    const denormalizedData = normalizr.denormalize(data.result, messagesSchema, data.entities)
    const denormLength = JSON.stringify(denormalizedData).length
    let percent = document.getElementById('normData')
    percent.innerHTML = `<b>norm</b>/denom = <b>${normLength}</b>/${denormLength}`
})