/**
 * @es7
 * @exponencial con **
 */
let numero = 5
let indice = 8
let n_a_la_2 = numero ** 2              //25
let n_a_la_3 = numero ** 3              //125
let n_a_la_indice = numero ** indice    //39065

let exponencial = { es7: 'exponencial',n_a_la_2,n_a_la_3,n_a_la_indice }
//console.log(exponencial)

/**
 * @es7
 * @includes
 */
let palabra1 = 'bet'
let palabra2 = 'beto'
let arrayPalabras = ['alfa','beto','beta','delta','alfabeto']
let incluye_al = palabra1.includes('al')                    //false
let incluye_bet = palabra2.includes(palabra1)               //true
let incluye_palabra1 = arrayPalabras.includes(palabra1)     //false
let incluye_palabra2 = arrayPalabras.includes(palabra2)     //true

let incluir = { es7: 'incluir',incluye_al,incluye_bet,incluye_palabra1,incluye_palabra2 }
//console.log(incluir)

/**
 * @es8
 * @keys
 */
let datos = {
    nombre:'ignacio',
    apellido:'borraz',
    edad:'32'
}
let claves = Object.keys(datos)             //[ 'nombre', 'apellido', 'edad' ]
//console.log({ claves })

/**
 * @es8
 * @values
 */
let valores = Object.values(datos)          //[ 'ignacio', 'borraz', '32' ]
//console.log({ valores })

/**
 * @es8
 * @entries
 */
let clavesYvalores = Object.entries(datos)  //[ [ 'nombre', 'ignacio' ], [ 'apellido', 'borraz' ], [ 'edad', '32' ] ]
//console.log({ clavesYvalores })

/**
 * @es9
 * @spread
 */
let unir_arrays_con_spread = [ ...claves,...valores ]   //[ 'nombre', 'apellido', 'edad', 'ignacio', 'borraz', '32' ]
//console.log(unir_arrays_con_spread)
let unir_objs_con_spread = { ...{claves},...{valores} } //{ claves:['nombre','apellido','edad'], valores:['ignacio','borraz','32'] }
//console.log(unir_objs_con_spread)

/**
 * @es9
 * @rest
 */
let { nombre,...rest } = datos
//console.log(rest)               //{ apellido: 'borraz', edad: '32' }
let [primera,...resto] = valores
//console.log(resto)              //[ 'borraz', '32' ]

/**
 * @es10
 * @trim
 */
let cadena = '    tiene espacios adelante y atrás  '
let cadenaTrim = cadena.trim()                  //'tiene espacios adelante y atrás'
//console.log({ cadenaTrim })

/**
 * @es10
 * @flat
 */
let arrayAnidado = ['hola',['como','estas','bien','bien!']]
let arrayFlat = arrayAnidado.flat()          //[ 'hola', 'como', 'estas', 'bien', 'bien!' ]
//console.log(arrayFlat)

/**
 * @es11
 * @nullish
 */
let cero = 0
let nulo = null
let no_definido = undefined
cero = cero ?? 'se reasigna si es nulo/indefinido'
//console.log(cero)                                       //0
nulo = nulo ?? 'si es nulo/indefinido'
//console.log(nulo)                                       //'si es nulo/indefinido'
no_definido = no_definido ?? 'si es nulo/indefinido'
//console.log(no_definido)                               //'si es nulo/indefinido'

/**
 * @es11
 * @privates
 */
class Producto {
    #costo_unitario
    constructor(datos) {
        this.nombre = datos.nombre
        this.#costo_unitario = datos.precio * 0.6
        this.precio = datos.precio
        this.stock = datos.stock
    }
    #ganancia () {
        return this.precio - this.#costo_unitario
    }
    ganancia_potencial() {
        return this.#ganancia() * this.stock
    }
}
let cama = new Producto({ nombre:'cama',precio:10000,stock:2 })
//console.log(cama)                       //Producto { nombre: 'cama', precio: 10000, stock: 2 }
//console.log(cama.nombre)                //cama
//console.log(cama.costo_unitario)        //undefined
//console.log(cama.ganancia())            //error
//console.log(cama.ganancia_potencial())  //8000