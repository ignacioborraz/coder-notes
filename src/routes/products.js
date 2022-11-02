const router = require('express').Router()

const products = require('../../storage/products')

router.post('/', async(req, res, next) => {
    try {
        let data = await products.save(req.body)
        res.status(201).render(
            'pages/done',
            {data}
        )
    } catch(error) {
        next(error)
    }
})

router.get('/new', (_req, res) => {
    res.status(200).render('pages/index')
})


router.get('/', async(_req, res, next) => {
    try {
        let data = await products.getAll()
        if (data) {
            res.status(200).render(
                "pages/products",
                {data}
            )
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
    const { id } = req.params
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