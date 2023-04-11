/* 
Para todas las operaciones/funciones:
Debe devolver una PROMESA que se resuelva siempre que el resultado sea positivo.
En caso de que algún número NO sea número, rechazar la promesa indicando “Solo números”
En caso de que algún número sea cero, rechazar la promesa indicando “Operación innecesaria”

Definir función suma:
En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos” (ejemplo: 10 + (-15) = -5 debe rechazarse)

*/

function suma(n1,n2) {
    //devuelvo una promesa
    return new Promise(
        (resolve,reject) => {
            //lo primero que tengo que verificar es numero y si es mayor que cero
            let verificarN1 = esNumero(n1)
            //console.log(verificarN1)
            let verificarN2 = esNumero(n2)
            //console.log(verificarN2)
            if (verificarN1.number && verificarN2.number) {
                let verificarSumaMayorAcero = verificarN1.number+verificarN2.number //suma las propiedades number de ambas verificaciones
                if (verificarSumaMayorAcero>0) {
                    return resolve(verificarSumaMayorAcero)
                } else {
                    return reject({
                        error: 'La calculadora sólo debe devolver valores positivos'
                    })
                }                
            } else {
                return reject({
                    n1: verificarN1.message ?? 'El numero está correcto',
                    n2: verificarN2.message ?? 'El numero está correcto'
                })
            }
        }
    )
}
//usando then/catch
//suma(5,10).then(res=>console.log(res)).catch(err=>console.log(err))
//suma(0,8).then(res=>console.log(res)).catch(err=>console.log(err))
//suma('hola',10).then(res=>console.log(res)).catch(err=>console.log(err))
//suma('chau',1).then(res=>console.log(res)).catch(err=>console.log(err))
//suma(2,0).then(res=>console.log(res)).catch(err=>console.log(err))

//usando async/await
//calculos(5,10,suma)
//calculos(0,8,suma)
//calculos('hola',10,suma)
//calculos('chau',1,suma)
//calculos(2,0,suma)
//calculos(8,-10,suma)

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

function resta (n1,n2) {
    return new Promise(
        (resolve,reject) => {
            let verificarN1 = esNumero(n1)
            let verificarN2 = esNumero(n2)
            if (verificarN1.number && verificarN2.number) { //primero verifico que sean numeros mayores que cero
                let resultado = verificarN1.number - verificarN2.number
                if (resultado>0) {//luego verifico que el resultado sea positivo
                    return resolve(resultado)
                } else {
                    return reject({
                        error: 'La calculadora sólo debe devolver valores positivos'
                    })
                }
            } else {
                return reject({
                    n1: verificarN1.message ?? 'El numero está correcto',
                    n2: verificarN2.message ?? 'El numero está correcto'
                })
            }
        }
    )
}

//usando async/await
calculos(5,10,resta)
calculos(0,8,resta)
calculos('hola',10,resta)
//calculos('chau',1,resta)
//calculos(2,0,resta)
calculos(8,-10,resta)