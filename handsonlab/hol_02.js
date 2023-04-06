//Definir la clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
//La clase debe contar con una variable privada “gain”, que será la ganancia de un ticket (15%)
//Debe contar con el método “getEvents” que mostrará los eventos guardados.
/* 
Debe contar con el método “addEvent” que recibirá los siguientes parámetros:
name
place
price (al cual hay que agregarle la ganancia adicional)
capacity (si no se da: 50 por defecto)
date (si no se da: hoy por defecto)
El método deberá crear además el campo id autoincrementable y el campo “participants” que siempre iniciará con un arreglo vacío.

*/


class TicketManager {

    #gain

    constructor() {
        this.events = []
        this.#gain = 0.15
    }

    getEvents() {
        console.log(this.events)
        return this.events
    }

    getEventById(event_id) {
        let one = this.events.find(each=> each.id === event_id)
        if (one) {
            console.log(one)
            return one
        }
        console.log('not found')
        return null
    }

    addEvent({ name,place,price,capacity,date }) {
        capacity = capacity ?? 50
        date = date ?? new Date()
        let id = 0
        if (this.events.length===0) {
            id = 1
        } else {
            let lastEvent = this.events[this.events.length-1] //el ultimo elemento tiene indice igual a la longitud del array MENOS 1
            id = lastEvent.id + 1
        }
        price = price + this.#gain * price
        let event = { name,place,price,capacity,date,id, participants: [] }
        //event.participants = []
        this.events.push(event)
    }

    addParticipant(event_id,user_id) {
        let found_event = this.getEventById(event_id)
        //console.log(found_event.participants)
        if (found_event) {
            if (found_event.capacity > found_event.participants.length) {
                let user = found_event.participants.includes(user_id)
                if (user) {
                    console.log(`el usuario ${user_id} ya se encuentra en la lista`)
                } else {
                    console.log('agregado usuario '+user_id)
                    found_event.participants.push(user_id)
                    //verificar que el array this.events fue o no fue modificado
                    //en caso de no modificarse: usar un for para cambiar el evento con la modificacion realizada
                    //console.log(found_event.participants)
                    //return user_id        //lo sacamos de la condicion ya que es necesario seguir con la condicion del cambio d enombre
                }
            } else {
                console.log('no hay mas capacidad')
            }
        }/*  else {
            console.log('no se encontró el evento '+event_id);
        } */
        return null
    }

    changeName(event_id,new_name) {
        let found_event = this.getEventById(event_id)
        found_event.name = new_name
            /*
            for (let each of this.events) {
                if (each.id === event_id) { //si coincide el id del evento a modificar
                    return found_event      //retorno el evento encontrado y luego modificado
                } else {                    //en caso contrario (no coincide)
                    return each             //retorno el evento del array
                }
            }
            */
        console.log('nombre cambiado')
    }

    editEvent(event_id,datos) {  //datos va a ser el objeto con las variables a modificar (puede ser solo name o puede name con place o pueden ser TODOS los campos)
        let found_event = this.getEventById(event_id)
        for (let propiedad in datos) {
            //console.log(propiedad)
            found_event[propiedad] = datos[propiedad]
        }
    }

    addNewEvent(event_id,new_place,new_date) {
        let found_event = { ...this.getEventById(event_id) }
        this.addEvent({
            name: found_event.name,
            place: new_place,
            price: found_event.price,
            capacity: found_event.capacity,
            date: new_date
        })
        console.log('se creo el nuevo evento')
    }

    deleteEvent(event_id) {
        this.events = this.events.filter(each => each.id !== event_id)
        console.log('evento eliminado')
    }

}

let ticket = new TicketManager()
//console.log(ticket.gain)
ticket.addEvent({ name: 'alice in borderland', place: 'korea', price: 5,capacity: null, date: undefined })
ticket.addEvent({ name: 'hp', place: 'england', price: 10 })
ticket.addEvent({ name: 'pokemon', place: 'japon', price: 50,capacity: 2, date: new Date('07/09/2023') })
ticket.addEvent({ name: 'disney', place: 'miami', price: 100,capacity: 5000, date: new Date('07/20/2023') })
//ticket.getEvents()
//ticket.getEventById(2)
//ticket.getEventById(9)
//ticket.addParticipant(3,5)
//ticket.addParticipant(3,9)
//ticket.addParticipant(3,15)
//ticket.addParticipant(1,5)
//ticket.addParticipant(1,5)
//ticket.addParticipant(1,5,'hola')
//ticket.getEventById(1)
//ticket.addNewEvent(3,'china',new Date('08/20/2023'))
//ticket.getEvents()
//ticket.deleteEvent(1)
//ticket.getEvents()
ticket.editEvent(1,{name: 'hola', place: 'rosario'})
ticket.getEventById(1)