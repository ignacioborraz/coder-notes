const fs = require('fs')

let ruta_archivo = './data.json'
//importante: si la ruta contiene alguna carpeta que no existe: NO LA CREA!
let contenido = JSON.stringify(['nuevo',{ nombre:'igna' }],null,2)

fs.writeFileSync(ruta_archivo,contenido)

let configuracion = 'utf-8'
let contenido_leido = fs.readFileSync(ruta_archivo,configuracion)
console.log(contenido_leido)

fs.unlinkSync(ruta_archivo)
//borra el archivo con todo el contenido

let existe = fs.existsSync(ruta_archivo)
console.log(existe)         //false