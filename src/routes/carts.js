const express = require('express')
const router = express.Router()
const { FROM } = process.env


let carts
const CartManager = require(`../daos/${FROM}/Cart`)
if (FROM==='mongo') {
    carts = new CartManager()
}
carts = new CartManager('./src/data/carts.json')

/* PETICION POST PARA CREAR UN CARRITO */
router.post('/', async(req, res, next) => {
    try {
        let response = await carts.create(req.body)
        if (!response.success) {
            return res.status(400).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA OBTENER CARRITOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await carts.read(limit)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION GET PARA OBTENER UN CARRITO */
router.get('/:id/products', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await carts.readOne(id)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA AGREGAR PRODUCTOS A UN CARRITO */
router.put('/:cid/add/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let response = await carts.addProduct(cid,pid)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION PUT PARA QUITAR PRODUCTOS A UN CARRITO */
router.put('/:cid/delete/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let response = await carts.deleteProduct(cid,pid)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next()
    }
})

/* PETICION DELETE PARA ELIMINAR UN CARRITO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await carts.destroy(id)
        if (!response.success) {
            return res.status(404).send(response)
        }
        return res.status(200).send(response)
    } catch(error) {
        return next(error)
    }
})

module.exports = router