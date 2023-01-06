const Message = require('../../models/Message')

class MessageManager{
       
    read = async (limit) => { //defino el método para obtener todos los mensajes
        try {
            let response =  await Message.find().limit(limit).lean()
            if (!response) {
                let message = 'no messages yet'
                return { success: false, response: message }
            }
            return { success: true, response }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

}

module.exports = MessageManager