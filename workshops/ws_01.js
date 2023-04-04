let i = 100 //global para todo el archivo
function foo(variable) {
    console.log('L3: '+variable) //llama a la global
    let i = 0 //local dentro de la funcion
    //pero es "global" para el condicional
    if (true) {
        let i =1 //local dentro del condicional
        console.log('L7: '+i)
    }
    console.log('L9: '+i)
}
//console.log('L11: '+i)

//foo(1)
//foo(2)
//foo(i)

//objeto y el array son mutables
const datos = {
    nombre: 'ignacio',
    apellido: 'borraz'
}
datos.nombre = 'igna'
datos.edad = 32
delete datos.apellido

//console.log(datos)

/* datos ={
    nacimiento: 'rosario'
}
console.log(datos) */

const lista = [
    'nico','agustin','fran','mattia'
]
lista.push('chris')
lista.shift()
//console.log(lista)

/* lista = ['flor','magali']
console.log(lista) */

function sumar10 (numero) {
    let resultado = numero + 10
    return resultado
}
//flecha10(10) //flecha10 se define como variable en la 49
let flecha10 = (numero) => numero+10
//console.log(flecha10(10))

function operaciones (num1,num2,num3) {
    //primero le sumo 10 al num1
    num1 = sumar10(num1)
    //segundo multiplico num2 con num3
    let parcial = num2 * num3
    //tercero resto num1 al resultado anterior
    let total = parcial - num1
    //finalizo con return
    //return total
    //return [total,parcial]
    return { total,parcial }
}

let operacion1 = sumar10(1)
let operacion2 = operaciones(2,5,4)
//console.log(operacion1)
//console.log(operacion2)

const operacionFlecha = (n1,n2,n3) => {
    n1 = sumar10(n1)
    let parcial = n2*n3
    let total = parcial-n1
    return { total }
}
let operacion3 = operacionFlecha(2,5,4)
//console.log(operacion3)

function mostrarLista(array){
    let response = ''
    if (array.length === 0) {
        response = 'la lista está vacía'
    } else {
        array.forEach(each=>console.log(each))
        response = 'la lista tuvo elementos'
    }
    console.log(response)
    return response
}
//mostrarLista([])
//mostrarLista([1,2,5,6,10,27])

class Persona {
    //agregar una propiedad para contar la cantidad de PERSONAS que se definieron en la aplicación
    constructor(datos) {
        this.nombre = datos.nombre
        //apellid edad pelo altura
        this.apellido = datos.apellido
        this.edad = datos.edad
        this.pelo = datos.pelo
        this.altura = datos.altura
        Persona.contadorPersonas++
    }
    static contadorPersonas = 0
    saludar() {
        console.log(`hola ${this.nombre}!`)
    }
    nombrar = () => console.log(this.nombre)
    modificarNombre() {
        this.nombre = 'kevin'
        console.log(this.nombre)
    }
}

let ignacio = new Persona({ nombre:'igna',apellido:'borraz',edad:'32',pelo:'sin',altura:1.78 })
ignacio.nombrar()
//ignacio.saludar()
let apellido = ignacio.apellido
//console.log(apellido)
ignacio.modificarNombre()

let javier = new Persona({ nombre:'igna',apellido:'borraz',edad:'32',pelo:'sin',altura:1.78 })
let maria =  new Persona({ nombre:'igna',apellido:'borraz',edad:'32',pelo:'sin',altura:1.78 })
let marta =  new Persona({ nombre:'igna',apellido:'borraz',edad:'32',pelo:'sin',altura:1.78 })

console.log(Persona.contadorPersonas)