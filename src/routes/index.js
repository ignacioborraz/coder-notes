const router = require('express').Router()
//requiero la clase Router del módulo de express

const products = require('./products')
//requiero las rutas de products

router.use('/products', products)
//defino que las rutas de products contengan "/products"

module.exports = router
//exporto para poder usar el enrrutador principal en app.js