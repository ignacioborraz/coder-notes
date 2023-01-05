const socket = io()

let user
let chatBox = document.getElementById('chatBox')

Swal.fire({ //utilizamos una alerta para autenticar al usuario
    title: "identify yourself",
    input: "text",
    inputValidator: value => {
        return !value && 'write a nick please!'
    },
    allowOutsideClick: false
}).then(result => { //seteamos user
    user = result.value
    let txtUsername = document.getElementById('username')
    txtUsername.innerHTML = user
    socket.emit('authenticated', user) //emitimos la autenticacion hacia el servidor
})

chatBox.addEventListener('keyup', event => { //capturo el enter de cada texto enviado por los usuarios
    if(event.key == 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', { //emitimos un mensaje hacia el servidor
                user, 
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', data => { //recibo la respuesta del servidor para renderizar los mensajes
    let log = document.getElementById('messageLogs')    
    log.innerHTML = data.map(message => `<br><b>${message.user}</b>: ${message.message}`).join('')
})