const router = require('express').Router()
//requiero la clase Router del módulo de express

const products = require('../../storage/products')
//requiero el modulo del contenedor de productos que cree en la tarea anterior

router.post('/', async(req, res, next) => {
//ruta para crear un nuevo producto
//utiliza el metodo POST y requiere BODY con las propiedades del producto
    try {
        let data = await products.save(req.body)
        res.status(200).json({
            response: data
        })
    } catch(error) {
        next(error)
    }
})

router.get('/', async(_req, res, next) => {
//ruta para obtener todos los productos
//utiliza el metodo GET
    try {
        let data = await products.getAll()
        if (data) {
            res.status(200).json({
                response: data
            })
        } else {
            res.status(404).json({
                response: 'can not find'
            })
        }
    } catch(error) {
        next(error)
    }
})

router.get('/random', async(_req, res, next) => {
//ruta para obtener un producto random
//utiliza el metodo GET
    try {
        let data = await products.getOne()
        if (data) {
            res.status(200).json({
                response: data
            })
        } else {
            res.status(404).json({
                response: 'can not find'
            })
        }
    } catch(error) {
        next(error)
    }
})

router.get('/:id', async(req, res, next) => {
//ruta para obtener un producto por id
//utiliza el metodo GET y requiere PARAMS para el id
    const { id } = req.params //del objeto params extraigo la propiedad id
    //const id = req.params.id //sin desestructurar
    try {
        let data = await products.getById(id)
        if (data) {
            res.status(200).json({
                response: data
            })
        } else {
            res.status(404).json({
                response: 'not found'
            })
        }
    } catch(error) {
        next(error)
    }
})


router.put('/:id', async(req, res, next) => {
//ruta para modificar un producto
//utiliza el metodo PUT y requiere PARAMS para el id y BODY para la propiedad a modificar
let { id } = req.params
    try {
        let data = await products.putById(id, req.body)
        if (data) {
            res.status(200).json({
                response: data
            })
        } else {
            res.status(404).json({
                response: 'can not find'
            })
        }
    } catch(error) {
        next(error)
    }
})

router.delete('/:id', async(req, res, next) => {
//ruta para eliminar un producto
//utiliza el metodo DELETE y requiere PARAMS para el id
    let { id } = req.params
    try {
        let data = await products.deleteById(id)
        if (data) {
            res.status(200).json({
                response: 'product deleted'
            })
        } else {
            res.status(404).json({
                response: 'can not find'
            })
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router