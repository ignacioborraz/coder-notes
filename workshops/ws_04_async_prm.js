const fs = require('fs')

let ruta_archivo = './data/data.json'
//importante: si la ruta contiene alguna carpeta que no existe: NO LA CREA!
//manejemos este error con promesas
let contenido = JSON.stringify(['nuevo',{ nombre:'igna' }],null,2)

fs.promises.writeFile(ruta_archivo,contenido)
    .then(res=>console.log('se escribió correctamente'))
    .catch(error=>console.log('ocurrió un error'))

let configuracion = 'utf-8'
fs.promises.readFile(ruta_archivo,configuracion)
    .then(res=>console.log(res))
    .catch(error=>console.log('ocurrió un error'))


fs.promises.unlink(ruta_archivo)
    .then(res=>console.log('se eliminó correctamente'))
    .catch(error=>console.log('ocurrió un error'))
//borra el archivo con todo el contenido