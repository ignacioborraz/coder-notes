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
            let message = 'initializing'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    recoverData = async () => { //defino el método que va a recuperar los datos, si existen
        try {
            let products = await this.read()
            if (products.success) {
                this.products = products.products
                this.id = products.products[this.products.length-1]?.id+1
                this.codes = products.products.map(prod => prod.code)
            }
            let message = 'recovering'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    create = async ({title,description,price,code,stock,category,thumbnail}) => {//defino el método para agregar un producto
        if (!title || !description || !price || !code || !stock || !thumbnail) {
            let message = 'complete all the fields'
            return { success: false, message }
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
                return { success: true, message }
            }
            let message = 'invalid code'
            return { success: false, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }
    
    read = (limit) => { //defino el método para obtener todos los productos
        try {
            let products = JSON.parse(fs.readFileSync(this.path))
            if (products.length===0) {
                let message = 'no products yet'
                return { success: false, message }
            }
            if (limit) {
                products = products.slice(0,limit)
            }
            return { success: true, products }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }
    
    readOne = async (id) => { //defino el método para obtener un producto
        try {
            let product = this.products.find(prod => prod.id === Number(id))
            if (!product) {
                let message = 'not found'
                return { success: false, message }
            } 
            return { success: true, product }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }           
    }

    update = async (id,data) => { //defino el método para modificar un producto
        try {
            const one = await this.readOne(id)
            if (!one.success) {
                let message = 'cant find id'
                return { success: false, message }
            }
            if (!data) {
                let message = 'must enter almost one key'
                return { success: false, message }
            }
            if (!data.id) {
                for (let prop in data) {
                    one[prop] = data[prop]
                }
                this.products.map(prod => prod.id===Number(id) ? one : prod )
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
                let message = 'updated product!'
                return { success: true, message }
            } else { 
                let message = 'can not modify the id'
                return { success: false, message }
            }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    destroy = async (id) => { //defino el metodo para eliminar un producto
        try {
            const one = await this.readOne(id)
            if (!one.success) {
                let message = 'can not find id'
                return { success: false, message }
            }
            this.products = this.products.filter(prod => prod.id !== Number(id))
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            let message = 'deleted product!'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }        
    }

}

module.exports = ProductManager