const express = require('express')
const router = express.Router()
const { FROM } = process.env

const ProductManager = require(`../daos/${FROM}/Product`)
let products = new ProductManager('./src/data/products.json')

/* PETICION GET PARA OBTENER PRODUCTOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let prods = await products.getProducts(limit)
        if (!prods) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prods)
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA OBTENER UN PRODUCTO */
router.get('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let one = await products.getProductById(Number(id))
        if (!one) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(one)
    } catch(error) {
        return next()
    }
})

/* PETICION POST PARA CREAR UN PRODUCTO */
router.post('/', async(req, res, next) => {
    let { title,description,price,code,stock,thumbnail } = req.body
    try {
        let prod = await products.addProduct({ title,description,price,code,stock,thumbnail })
        if (prod.message==='product created') {
            return res.status(200).send(prod)
        } else {
            return res.status(400).send(prod)
        }
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.updateProduct(Number(id),req.body)
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return next()
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.deleteProduct(Number(id))
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return next(error)
    }
})

module.exports = router