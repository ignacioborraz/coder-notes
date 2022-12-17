const Cart = require('../../models/Cart')

class CartManager{
    
    create = async () => {//defino el método para agregar un carrito
        try {
            let cart = await Cart.create({ products: [] })
            if (!cart) {
                let message = 'can not create'
                return { success: false, message }
            }
            let message = 'cart created'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }
    
    read = async (limit) => { //defino el método para obtener todos los carritos
        try {
            let carts =  await Cart.find().limit(limit)
            if (!carts) {
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
            let cart =  await Cart.findById(id)
            if (!cart) {
                let message = 'not found'
                return { success: false, message }
            } 
            return { success: true, products: cart.products }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    addProduct = async (cid,pid) => { //defino el método para agregar productos un carrito
        try {
            const cart = await Cart.findById(cid)
            if (!cart) {
                let message = 'can not find id'
                return { success: false, message }
            }
            let finded = cart.products.find(prod => prod.id == pid )
            if (!finded) {
                let product = { id: pid, quantity: 0 }
                cart.products.push(product)
            } else {
                for (let prod of cart.products) {
                    if (prod.id == pid) {
                        prod.quantity++
                    }
                }
            }
            await cart.save()
            let message = 'added product to cart'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    deleteProduct = async (cid,pid) => { //defino el método para quitar productos un carrito
        try {
            const cart = await Cart.findById(cid)
            if (!cart) {
                let message = 'can not find id'
                return { success: false, message }
            }
            let finded = cart.products.find(prod => prod.id == pid )
            if (!finded) {
                let message = 'can not find id'
                return { success: false, message }
            }else {
                for (let prod of cart.products) {
                    if (prod.id == pid) {
                        prod.quantity--
                    }
                    if (prod.quantity === 0) {
                        cart.products = cart.products.filter(prod => prod.id != pid )
                    }
                }
            }
            await cart.save()
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
            let cart =  await Cart.findByIdAndDelete(id)
            if (!cart) {
                let message = 'can not find id'
                return { success: false, message }
            }
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