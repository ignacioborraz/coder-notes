require('dotenv').config()
let products = require('./storage/products')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.set('port',PORT)

app.use(express.json())

app.post('/products', async(req, res) => {
    try {
        let data = await products.save(req.body)
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
        console.log(error)
        res.status(400).json({
            response: 'error'
        })
    }
})

app.get('/products', async(_req, res) => {
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
        console.log(error)
        res.status(400).json({
            response: 'error'
        })
    }
})

app.get('/random-product', async(_req, res) => {
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
        console.log(error)
        res.status(400).json({
            response: 'error'
        })
    }
})

app.put('/products/:id', async(req, res) => {
    let { id } = req.params
    try {
        let data = await products.putById(id,req.body)
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
        console.log(error)
        res.status(400).json({
            response: 'error'
        })
    }
})

app.delete('/products/:id', async(req, res) => {
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
        console.log(error)
        res.status(400).json({
            response: 'error'
        })
    }
})

app.listen(app.get('port'), () =>
    console.log('SERVER READY IN PORT: '+app.get('port'))
)