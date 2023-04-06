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