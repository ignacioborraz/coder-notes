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
    //emitir la autenticación del usuario
})

//agregar recepción de los mensajes guardados

//agregar evento keyup (event.key == 'Enter') para emitir el nuevo mensaje