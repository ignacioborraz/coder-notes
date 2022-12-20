const express = require('express')
const router = express.Router()
const { FROM } = process.env

let products
const ProductManager = require(`../daos/${FROM}/Product`)
if (FROM==='mongo') {
    products = new ProductManager()
}
if (FROM==='fs') {
    products = new ProductManager('./src/data/products.json')
}

/* PETICION POST PARA CREAR UN PRODUCTO */
router.post('/', async(req, res, next) => {
    try {
        let response = await products.create(req.body)
        if (!response.success) {
            return res.status(400).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA OBTENER PRODUCTOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await products.read(limit)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA OBTENER UN PRODUCTO */
router.get('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await products.readOne(id)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await products.update(id,req.body)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await products.destroy(id)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next(error)
    }
})

module.exports = router