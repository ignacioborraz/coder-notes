const fs = require('fs')

class CartManager{ //defino la clase
    
    constructor(path) { //defino el constructor
        this.path = path //ruta del archivo
        this.carts = [] //los carritos
        this.id = 1 //id del proximo carrito a crear
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
            let carts = this.getCarts()
            if (carts.length>0) {
                this.carts = carts
                this.id = carts[this.carts.length-1].id+1
            }
            return null
        } catch (err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    newCart = async () => {//defino el método para crear un carrito
        try {
            let cart = {
                id: this.id,
                products: []
            }
            this.id++
            this.carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'cart created'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    addProductToCart = async (cId,pId) => {//defino el método para agregar un producto a un carrito
        try {
            let one = await this.getCartById(cId)
            if (!one) {
                let message = 'cart not found'
                //console.log(message)
                return { message }
            }
            let index = one.products.map(prod=>prod.id).indexOf(pId)
            if (index>=0) {
                one.products[index].quantity++
            } else {
                one.products.push({
                    id: pId,
                    quantity: 1
                })
            }
            this.carts.map(cart => cart.id===cId ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'product added'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    deleteProductFromCart = async (cId,pId) => {//defino el método para agregar un producto a un carrito
        try {
            let one = await this.getCartById(cId)
            if (!one) {
                let message = 'cart not found'
                //console.log(message)
                return { message }
            }
            let index = one.products.map(prod=>prod.id).indexOf(pId)
            if (index<0) {
                let message = 'product not found'
                return { message }
            }
            one.products[index].quantity--
            this.carts.map(cart => cart.id===cId ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'product deleted'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }
    
    getCarts = () => { //defino el método para obtener todos los carritos
        try {
            let carts =  fs.readFileSync(this.path)
            carts = JSON.parse(carts)
            if (carts) {
                return carts
            } else {
                let message = 'no carts yet'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.message)
            return { error: err.message }
        }
    }
    
    getCartById = async (id) => { //defino el método para obtener un carrito
        try {
            let one = this.carts.find(cart => cart.id === id)
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

}

module.exports = CartManager