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
            let carts = await this.read()
            if (carts.success) {
                this.carts = carts.carts
                this.id = carts.carts[this.carts.length-1]?.id+1
            }
            let message = 'recovering'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    create = async () => {//defino el método para crear un carrito
        try {
            let cart = {
                id: this.id,
                products: []
            }
            this.id++
            this.carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'cart created'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    read = () => { //defino el método para obtener todos los carritos
        try {
            let carts = JSON.parse(fs.readFileSync(this.path))
            if (carts.length===0) {
                let message = 'no carts yet'
                return { success: false, message }
            }
            return { success: true, carts }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }
    
    readOne = async (id) => { //defino el método para obtener un carrito
        try {
            let one = this.carts.find(cart => cart.id === Number(id))
            if (one) {
                return { success: true, products: one.products }
            } else {
                let message = 'invalid id'
                return { success: false, message }
            }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }           
    }

    addProduct = async (cId,pId) => {//defino el método para agregar un producto a un carrito
        try {
            let one = await this.readOne(cId)
            if (!one.success) {
                let message = 'cart not found'
                return { success: false, message }
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
            this.carts.map(cart => cart.id===Number(cId) ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'added product to cart'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    deleteProduct = async (cId,pId) => {//defino el método para agregar un producto a un carrito
        try {
            let one = await this.readOne(cId)
            if (!one.success) {
                let message = 'cart not found'
                return { success: false, message }
            }
            let index = one.products.map(prod=>prod.id).indexOf(pId)
            if (index<0) {
                let message = 'product not found'
                return { success: false, message }
            }
            one.products[index].quantity--
            if (one.products[index].quantity === 0) {
                one.products.splice(index,1)
            }
            this.carts.map(cart => cart.id===cId ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'deleted product to cart'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    destroy = async (id) => { //defino el metodo para eliminar un carrito
        try {
            let all = await this.read()
            if (!all.success) {
                return all
            }
            let index = all.carts.map(cart=>Number(cart.id)).indexOf(Number(id))
            if (index<0) {
                let message = 'cart not found'
                return { success: false, message }
            }
            console.log(all.carts)
            console.log(index)
            all.carts.splice(index,1)
            this.carts = all.carts
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'deleted cart'
            return { success: false, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }        
    }

}

module.exports = CartManager