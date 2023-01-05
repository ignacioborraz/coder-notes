const Product = require('../../models/Product')

class ProductManager{
    
    create = async ({title,description,price,code,stock,category,thumbnail}) => {//defino el método para agregar un producto
        if (!title || !description || !price || !code || !stock || !thumbnail) {
            let message = 'complete all the fields'
            return { success: false, message }
        }
        try {
            let product = await Product.create({title,description,price,code,stock,thumbnail,category,status:true})
            if (!product) {
                let message = 'can not create'
                return { success: false, message }
            }
            let message = 'product created'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }
    
    read = async (limit) => { //defino el método para obtener todos los productos
        try {
            let products =  await Product.find().limit(limit).lean()
            if (!products) {
                let message = 'no products yet'
                return { success: false, message }
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
            let product =  await Product.findOne({ _id: id }).lean()
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
            if (!data) {
                let message = 'type almost one key'
                return { success: false, message }
            }
            if (data.id) {
                let message = 'can not modify the id'
                return { success: false, message }
            }
            const product = await Product.findByIdAndUpdate(id,data)
            if (!product) {
                let message = 'can not find id'
                return { success: false, message }
            }
            let message = 'updated product'
            return { success: true, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }
    }

    destroy = async (id) => { //defino el metodo para eliminar un producto
        try {
            let product =  await Product.findByIdAndDelete(id)
            if (!product) {
                let message = 'can not find id'
                return { success: false, message }
            }
            let message = 'deleted product'
            return { success: false, message }
        } catch(err) {
            console.log(err.stack)
            let message = err.message
            return { success: false, message }
        }        
    }

}

module.exports = ProductManager