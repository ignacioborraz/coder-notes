let sumar = (num1,num2)=> num1+num2
let restar = (num1,num2)=> num1-num2
let multiplicar = (num1,num2)=> num1*num2
let dividir = (num1,num2)=> num1/num2

const hacerOperacion = (num1,num2,operacion) => {
    let resultado = operacion(num1,num2)
    console.log(`el resultado es ${resultado}`)
    return resultado
}

hacerOperacion(20,2,sumar)
//el resultado es 22
hacerOperacion(20,2,restar)
//el resultado es 18
hacerOperacion(20,2,multiplicar)
//el resultado es 40
hacerOperacion(20,2,dividir)
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

dividirBien(20,1)
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
    .catch(resultado=>console.log(`error: ${resultado}`))

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
dividirAsync(10,2)  //el resultado es 5
dividirAsync(10,0)  //async error: no se puede dividir por cero