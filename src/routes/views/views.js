const express = require('express')
const router = express.Router()
const { FROM } = process.env
const generateProducts = require('../../daos/products.faker')

let products
const ProductManager = require(`../../daos/${FROM}/Product`)
if (FROM==='mongo') {
    products = new ProductManager()
}
if (FROM==='fs') {
    products = new ProductManager('./src/data/products.json')
}

/* PETICION GET PARA VER HOME CON TODOS PRODUCTOS */
router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await products.read(limit)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('index', {
            title: "list of products",
            nav: [
                { url: "./products-test", title: "faker" },
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            products: response.products
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA VER DETALLE DE UN PRODUCTO */
router.get('/detail/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let response = await products.readOne(id)
        if (!response) {
            return res.status(404).render('error',{
                message: 'invalid id'
            })
        }
        return res.status(200).render('detail', {
            title: "list of products",
            nav: [
                { url: "/", title: "home" },
                { url: "./products-test", title: "faker" },
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            product: response.product
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA ACCEDER AL CHAT */
router.get('/chat', async(req, res) => {
    try {
        res.status(200).render('chat', {
            title: "chat",
            nav: [
                { url: "/", title: "list" },
                { url: "./products-test", title: "faker" },
                { url: "/form", title: "form" }
            ],
            fileScript: "chat"
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA VER UN FORMULARIO DE NUEVO PRODUCTO */
router.get('/form', async(req, res) => {
    try {
        res.status(200).render('form', {
            title: "new product",
            nav: [
                { url: "./", title: "list" },
                { url: "./products-test", title: "faker" },
                { url: "/chat", title: "chat" }
            ],
            fileScript: "newProduct"
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION POST PARA CREAR UN PRODUCTO */
router.post('/new-product', async(req, res, next) => {
    let { title,description,price,code,stock,category,thumbnail } = req.body
    try {
        let response = await products.create({ title,description,price,code,stock,category,thumbnail })        
        if (response.message === 'product created') {
            return res.redirect('/')
        } else {
            return res.status(400).render('error',{
                message: response.message
            })
        }        
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION PUT PARA MODIFICAR UN PRODUCTO */
router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.update(Number(id),req.body)
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION DELETE PARA ELIMINAR UN PRODUCTO */
router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.destroy(Number(id))
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

/* PETICION GET PARA VER LOS FAKER PRODUCTS */
router.get('/products-test', async(req, res, next) => {
    try {
        let response = await generateProducts(6)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('index-faker', {
            title: "list of products",
            nav: [
                { url: "./", title: "list" },
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            products: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

module.exports = router