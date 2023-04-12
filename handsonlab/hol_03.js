/* 
Para todas las operaciones/funciones:
Debe devolver una PROMESA que se resuelva siempre que el resultado sea positivo.
En caso de que algún número NO sea número, rechazar la promesa indicando “Solo números”
En caso de que algún número sea cero, rechazar la promesa indicando “Operación innecesaria”

Definir función suma/resta/multiplicacion/division y en caso de que la operacion sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos” (ejemplo: 10 + (-15) = -5 debe rechazarse)
*/

//funcion de ayuda: para verificar si es numero y si es mayor a cero
function esNumero(num){
    if (isNaN(num)) {
        let message = 'Solo números'
        return { success: false, message }
    } else if (num===0) {
        let message = 'Operación innecesaria'
        return { success: false, message }
    } else {
        return { success: true, number: num }
    }
}
//funcion de ayuda: para verificar si da lo mismo que con then/catch
async function calculos(num1,num2,operacion){
    try {
        let calculo = await operacion(num1,num2)
        console.log(calculo)
        return calculo
    } catch(error) {
        console.log(error)
        return error
    }
}

function suma(n1,n2) {
    //devuelvo una promesa
    return new Promise(
        //con cualquier nombre pero siempre
        //el primer parámetro para si tiene éxito
        //y el segundo para rechazar
        (resolve,reject) => {
            let verificarN1 = esNumero(n1)                                              //console.log(verificarN1)
            let verificarN2 = esNumero(n2)                                              //console.log(verificarN2)
            //1° verificar que ambos numeros pasan "las pruebas de la funcion"
            if (verificarN1.number && verificarN2.number) {
                //2° opero las propiedades number de ambas verificaciones
                let verificarSumaMayorAcero = verificarN1.number + verificarN2.number     //console.log(verificarSumaMayorAcero)                
                //3° verifico que el resultado sea mayor a cero
                if (verificarSumaMayorAcero > 0) {
                    //4° con estas condiciones resuelvo con exito la promesa
                    return resolve(verificarSumaMayorAcero)
                } else {
                    //4° con estas condiciones resuelvo con fracaso la promesa
                    return reject({ error: 'La calculadora sólo debe devolver valores positivos' })
                }                
            } else {
                //2° con estas condiciones resuelvo con fracaso la promesa
                return reject({ error: verificarN1.message ?? verificarN2.message })
            }
        }
    )
}
/* 
//usando then/catch
suma(5,10).then(res=>console.log(res)).catch(err=>console.log(err))
suma(0,8).then(res=>console.log(res)).catch(err=>console.log(err))
suma('hola',10).then(res=>console.log(res)).catch(err=>console.log(err))
suma('chau',1).then(res=>console.log(res)).catch(err=>console.log(err))
suma(2,-10).then(res=>console.log(res)).catch(err=>console.log(err))
//usando async/await
calculos(5,10,suma)
calculos(0,8,suma)
calculos('hola',10,suma)
calculos('chau',1,suma)
calculos(2,-10,suma)
 */

function resta(n1,n2) {
    return new Promise(
        (resolve,reject) => {
            let verificarN1 = esNumero(n1)
            let verificarN2 = esNumero(n2)
            if (verificarN1.number && verificarN2.number) {
                let verificarRestaMayorAcero = verificarN1.number - verificarN2.number
                if (verificarRestaMayorAcero > 0) {
                    return resolve(verificarRestaMayorAcero)
                } else {
                    return reject({ error: 'La calculadora sólo debe devolver valores positivos' })
                }                
            } else {
                return reject({ error: verificarN1.message ?? verificarN2.message })
            }
        }
    )
}
/* 
//usando then/catch
resta(5,10).then(res=>console.log(res)).catch(err=>console.log(err))
resta(0,8).then(res=>console.log(res)).catch(err=>console.log(err))
resta('hola',10).then(res=>console.log(res)).catch(err=>console.log(err))
resta('chau',1).then(res=>console.log(res)).catch(err=>console.log(err))
resta(2,-10).then(res=>console.log(res)).catch(err=>console.log(err))
//usando async/await
calculos(5,10,resta)
calculos(0,8,resta)
calculos('hola',10,resta)
calculos('chau',1,resta)
calculos(2,-10,resta)
 */

function multiplicacion(n1,n2) {
    return new Promise(
        (resolve,reject) => {
            let verificarN1 = esNumero(n1)
            let verificarN2 = esNumero(n2)
            if (verificarN1.number && verificarN2.number) {
                let verificarProductoMayorAcero = verificarN1.number * verificarN2.number
                if (verificarProductoMayorAcero > 0) {
                    return resolve(verificarProductoMayorAcero)
                } else {
                    return reject({ error: 'La calculadora sólo debe devolver valores positivos' })
                }                
            } else {
                return reject({ error: verificarN1.message ?? verificarN2.message })
            }
        }
    )
}
/* 
//usando then/catch
multiplicacion(5,10).then(res=>console.log(res)).catch(err=>console.log(err))
multiplicacion(0,8).then(res=>console.log(res)).catch(err=>console.log(err))
multiplicacion('hola',10).then(res=>console.log(res)).catch(err=>console.log(err))
multiplicacion('chau',1).then(res=>console.log(res)).catch(err=>console.log(err))
multiplicacion(2,-10).then(res=>console.log(res)).catch(err=>console.log(err))
//usando async/await
calculos(5,10,multiplicacion)
calculos(0,8,multiplicacion)
calculos('hola',10,multiplicacion)
calculos('chau',1,multiplicacion)
calculos(2,-10,multiplicacion)
 */

function division(n1,n2) {
    return new Promise(
        (resolve,reject) => {
            let verificarN1 = esNumero(n1)
            let verificarN2 = esNumero(n2)
            if (verificarN1.number && verificarN2.number) {
                let verificarDivisionMayorAcero = verificarN1.number / verificarN2.number
                if (verificarDivisionMayorAcero > 0) {
                    return resolve(verificarDivisionMayorAcero)
                } else {
                    return reject({ error: 'La calculadora sólo debe devolver valores positivos' })
                }                
            } else {
                return reject({ error: verificarN1.message ?? verificarN2.message })
            }
        }
    )
}
/* 
//usando then/catch
division(5,10).then(res=>console.log(res)).catch(err=>console.log(err))
division(0,8).then(res=>console.log(res)).catch(err=>console.log(err))
division('hola',10).then(res=>console.log(res)).catch(err=>console.log(err))
division('chau',1).then(res=>console.log(res)).catch(err=>console.log(err))
division(2,-10).then(res=>console.log(res)).catch(err=>console.log(err))
//usando async/await
calculos(5,10,division)
calculos(0,8,division)
calculos('hola',10,division)
calculos('chau',1,division)
calculos(2,-10,division)
 */