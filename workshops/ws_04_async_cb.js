const fs = require('fs')

let ruta_archivo = './data/data.json'
//importante: si la ruta contiene alguna carpeta que no existe: NO LA CREA!
//manejemos este error con callbacks
let contenido = JSON.stringify(['nuevo',{ nombre:'igna' }],null,2)

fs.writeFile(ruta_archivo,contenido,(error)=> { 
    if (error) {
        console.log('ocurrió un error')
    }
})

let configuracion = 'utf-8'
fs.readFile(ruta_archivo,configuracion,(error,resultado)=> {
    if (error) {
        return error
    }
    console.log(resultado)
    return resultado
})

fs.unlink(ruta_archivo,(error)=> { 
    if (error) {
        console.log('ocurrió un error')
    }
})
//borra el archivo con todo el contenido