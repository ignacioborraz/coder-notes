const fs = require('fs')

class ProductManager{ //defino la clase
    
    constructor(path) { //defino el constructor
        this.path = path //ruta del archivo
        this.products = [] //los productos
        this.id = 1 //id del proximo producto a crear
        this.codes = [] //los codigos
        this.init() //creación del archivo si no existe
        this.recoverData() //recuperacion de datos del archivo
    }
    
    init = () => { //defino el método que va a inicializar una instancia
        try {
            let file = fs.existsSync(this.path,'utf-8') //utilizo el método para verificar si existe
            if (!file) { //si no existe
                fs.writeFileSync(this.path,JSON.stringify([])) //lo creo
            }
            return null //no necesito retornar nada
        } catch(err) {
            console.log(err.message)
            return err.message //retorno el mensaje de error
        }
    }

    recoverData = () => { //defino el método que va a recuperar los datos, si existen
        try {
            let products = this.getProducts()
            this.products = products
            this.id = products[this.products.length-1].id+1
            this.codes = products.map(prod => prod.code)
            return null
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }

    addProduct = async ({title,description,price,code,stock,thumbnail}) => {
        //defino el método para agregar un producto
        //el usuario tiene que pasar un objeto con todas esas propiedades
        if (!title || !description || !price || !code || !stock || !thumbnail) { //si no manda todo
            let message = 'complete all the fields'
            console.log(message)
            return message
        }
        try {
            if (!this.codes.includes(code)) { //si no se incluye el código
                let product = {title,description,price,code,stock,thumbnail}
                product.id = this.id //asigno el id
                this.id++ //reasigno el nuevo id
                this.codes.push(code) //pusheo el nuevo codigo
                this.products.push(product) //pusheo el nuevo producto
                await fs.promises.writeFile (this.path, JSON.stringify(this.products, null, 2)) //guardo en el archivo
                let message = 'product created'
                console.log(message)
                return message
            }
            let message = 'invalid code'
            console.log(message)
            return message
        } catch(err) {
            console.log(err.message)
            return err.message
        }
    }
    
    getProducts = () => { //defino el método para obtener todos los productos
        try {
            let products =  fs.readFileSync(this.path) //traigo todo del archivo
            products = JSON.parse(products)
            if (products) {
                //console.log(products)
                return products
            } else {
                let message = 'no products yet'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.message)
            return err.message
        }
    }
    
    getProductById= async (id) => { //defino el método para obtener un producto
        try {
            let one = this.products.find(prod => prod.id === id) //busco uno
            if (one) {
                //console.log(one)
                return one
            } else {
                let message = 'invalid id'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.message)
            return err.message
        }           
    }

    updateProduct = async (id,data) => { //defino el método para modificar un producto
        //el usuario debe pasar el id del producto y un objeto con la clave-valor a modificar
        const one = await this.getProductById(id) //lo busco
        if (!one) { //si no existe el id
            let message = 'cant find id'
            console.log(message)
            return null
        }
        if (!data) { //si no existe el objeto
            let message = 'must enter almost one key'
            console.log(message)
            return message
        }
        if (!data.id) { //si no quiere cambiar el id
            for (let prop in data) {
                one[prop] = data[prop]
            }
            this.products.map(prod => prod.id===id ? one : prod ) //reemplazo
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) //reecribo el archivo
            let message = 'updated product!'
            console.log(message)
            return message
        } else { 
            let message = 'can´t modify the id'
            console.log(message)
            return message
        }
      }

    deleteProduct = async (id) => { //defino el metodo para eliminar un producto
        //el usuario debe pasar el id del producto
        const one = await this.getProductById(id) //lo busco
        if (!one) { //si no existe el id
            let message = 'cant find id'
            console.log(message)
            return null
        }
        try {
            this.products = this.products.filter(prod => prod.id !== id) //lo saco de los productos
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) //reecribo el archivo
            let message = 'deleted product!'
            console.log(message)
            return message
        } catch(err) {
            console.log(err.message)
            return err.message
        }
        
    }
}

let manager = new ProductManager('./products1.txt')

async function test() {
    //let prod0 = { title: "title1", description: "description1", price: 1, code: 1001, stock: 100 }
    //await manager.addProduct(prod0)
    //let prod1 = { title: "title1", description: "description1", price: 1, code: 1001, stock: 100, thumbnail: "thumbnail1" }
    //await manager.addProduct(prod1)
    //let prod2 = { title: "title2", description: "description2", price: 2, code: 2002, stock: 200, thumbnail: "thumbnail2" }
    //await manager.addProduct(prod2)
    //let prod3 = { title: "title3", description: "description3", price: 3, code: 2002, stock: 300, thumbnail: "thumbnail3" }
    //await manager.addProduct(prod3)
    //await manager.getProducts()
    //await manager.getProductById(1)
    //await manager.getProductById(5)
    //await manager.updateProduct(8)
    //await manager.updateProduct(1)
    //await manager.updateProduct(1,{price:5000})
    //await manager.deleteProduct(8)
    //await manager.deleteProduct(1)
    console.log(manager)
}
    
test()