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
            let file = fs.existsSync(this.path,'utf-8')
            if (!file) {
                fs.writeFileSync(this.path,JSON.stringify([]))
            }
            return null
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    recoverData = () => { //defino el método que va a recuperar los datos, si existen
        try {
            let products = this.getProducts()
            if (products.length>0) {
                this.products = products
                this.id = products[this.products.length-1]?.id+1
                this.codes = products.map(prod => prod.code)
            }
            return null
        } catch (err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    addProduct = async ({title,description,price,code,stock,category,thumbnail}) => {//defino el método para agregar un producto
        //el usuario tiene que pasar un objeto con todas esas propiedades
        if (!title || !description || !price || !code || !stock || !thumbnail) {
            let message = 'complete all the fields'
            //console.log(message)
            return { message }
        }
        try {
            if (!this.codes.includes(code)) {
                let product = {title,description,price,code,stock,thumbnail,category,status:true}
                product.id = this.id
                this.id++
                this.codes.push(code)
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
                let message = 'product created'
                return { message }
            }
            let message = 'invalid code'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }
    
    getProducts = (limit) => { //defino el método para obtener todos los productos
        try {
            let products =  fs.readFileSync(this.path)
            if (products) {
                if (limit) {
                    products = products.slice(0,limit)
                }
                //console.log(products)
                return products
            } else {
                let message = 'no products yet'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }
    
    getProductById = async (id) => { //defino el método para obtener un producto
        //console.log(id)
        try {
            let one = this.products.find(prod => prod.id === id)
            if (one) {
                return one
            } else {
                let message = 'invalid id'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }           
    }

    updateProduct = async (id,data) => { //defino el método para modificar un producto
        //el usuario debe pasar el id del producto y un objeto con la clave-valor a modificar
        try {
            const one = await this.getProductById(id)
            if (!one) {
                let message = 'cant find id'
                console.log(message)
                return null
            }
            if (!data) {
                let message = 'must enter almost one key'
                return { message }
            }
            if (!data.id) {
                for (let prop in data) {
                    one[prop] = data[prop]
                }
                this.products.map(prod => prod.id===id ? one : prod )
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
                let message = 'updated product!'
                return { message }
            } else { 
                let message = 'can´t modify the id'
                return { message }
            }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    deleteProduct = async (id) => { //defino el metodo para eliminar un producto
        try {
            const one = await this.getProductById(id)
            if (!one) {
                let message = 'cant find id'
                console.log(message)
                return null
            }
            this.products = this.products.filter(prod => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            let message = 'deleted product!'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }        
    }

}

module.exports = ProductManager