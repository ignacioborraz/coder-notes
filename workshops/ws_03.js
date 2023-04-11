let sumar = (num1,num2)=> num1+num2
let restar = (num1,num2)=> num1-num2
let multiplicar = (num1,num2)=> num1*num2
let dividir = (num1,num2)=> num1/num2

const hacerOperacion = (num1,num2,operacion) => {
    let resultado = operacion(num1,num2)
    console.log(`el resultado es ${resultado}`)
    return resultado
}

//hacerOperacion(20,2,sumar)
//el resultado es 22
//hacerOperacion(20,2,restar)
//el resultado es 18
//hacerOperacion(20,2,multiplicar)
//el resultado es 40
//hacerOperacion(20,2,dividir)
//el resultado es 10

/*
puedo hacer lo siguiente?
hacerOperacion(20,0,dividir)
*/

//en caso de pasar parámetros o una función que no sea compatible con los parámetros puede ocasionar un error y rompernos el código
//una forma de manejar estas incopatibilidades es con promesas
let dividirBien = (num1,num2)=> {
    return new Promise((resolver,rechazar) => {
        //la funcion callback en este caso va a depender SIEMPRE
        //de dos parámetros que pueden tener CUALQUIER NOMBRE
        //el 1ero corresponderá a lo que se debe hacer cuando se resuelva la promesa, suele ponerse resolve
        //el 2do corresponderá cuando se rechace la promesa, suele ponerse reject
        let resultado
        if (num2===0) {
             resultado = rechazar('no se puede dividir por cero')
        } else {
            resultado = resolver(num1/num2)
        }
        //console.log(resultado)
        return resultado
    })
}

/* dividirBien(20,1)
    .then(resultado=>console.log(`el resultado es ${resultado}`))
    .catch(resultado=>console.log(`error: ${resultado}`))
//el resultado es 20
dividirBien(20,0)
    .then(resultado=>console.log(`el resultado es ${resultado}`))
    .catch(resultado=>console.log(`error: ${resultado}`))
//error: no se puede dividir por cero

//encadenamiento de promesas para manejar las respuestas
dividirBien(8,4)
    .then(resultado=> {
        console.log(`el resultado es ${resultado} y le vamos a sumar 10`)
        resultado = resultado+10
        return resultado
        //el return lo "captura" el siguiente then como parámetro
    })
    .then(resultado=> {
        console.log(`el nuevo resultado es ${resultado} y vamos a construir un objeto`)
        resultado = {
            resultado,
            doble: resultado*2,
            mitad: resultado/2
        }
        return resultado
        //el return lo "captura" el siguiente then como parámetro
    })
    .then(resultado=> {
        console.log('no siempre es necesario retornar y en este caso solo muestro en consola')
        console.log(resultado)
    })
    .catch(resultado=>console.log(`error: ${resultado}`)) */

//let err = null //no se necesita definir ninguno de los parámetros de las callbacks
//ya que e esos parámetros SON LAS RESPUESTAS correspondientes del éxito/fracaso
let respuesta1 = dividirBien(10,2) //la promesa cuando tiene exito la vamos a manejar con THEN
    .then(respuesta=> {
        console.log('me metí en el then')
        console.log(respuesta)
        return respuesta
    })
    .then(respuesta2=> {    //respuesta2 es lo que recibe del then anterior (lo que está en el return)
        respuesta2 = respuesta2+10
        return respuesta2
        //return respuesta2+10 //puedo retornar directamente
    })
    .then(res=> {           //res es lo que recibe del then anterior (lo que está en el return anterior)
        res = res*2
        return `la respuesta de todas las operaciones realizadas es ${res}`
    })
    .catch(respuesta=> console.log(respuesta))
//console.log(respuesta1)

let respuesta2 = dividirBien(10,0) //la promesa cuando se rechaza la vamos a manejar con CATCH
    .then(res=>console.log(`el resultado es: ${res}`))
    .catch(err=>{
        console.log('me metí en el catch')
        console.log(err)
    })
//console.log(respuesta2)

//funcion asincrona como alternativa eficiente al then/catch
//además dividirAsync envuelve a dividirBien por lo que además es una closure 
let dividirAsync = async(num1,num2)=> {
    try {
        let resultado = await dividirBien(num1,num2)
        //aqui adentro puedo realizar todas las operaciones que necesite
        console.log(`el resultado es ${resultado}`)
        return resultado
    } catch(error) {
        console.log(`async error: ${error}`)
    }
}
//dividirAsync(10,2)  //el resultado es 5
//dividirAsync(10,0)  //async error: no se puede dividir por cero

async function dividirOtraAsync (n1,n2) {
    let resultado = await dividirBien(n1,n2)
    console.log(resultado)
    return resultado
}

dividirOtraAsync(5,2)
dividirOtraAsync(5,0)

//el orden de ejecucion en mi computador es:
    //primero la funcion que responde 10/2
    //segundo la funciona asincrona
    //tercero la funcion que catchea 10/0