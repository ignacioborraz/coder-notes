require('dotenv').config()
let products = require('./storage/products')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.set('port',PORT)

app.use(express.json())

app.get('/products', async(_req, res) => {
    try {
        let data = await products.getAll()
        res.status(200).json(data)
    } catch(error) {
        console.log(error)
    }
})

app.get('/randomProducts', async(_req, res) => {
    try {
        let data = await products.getAll()
        const id = parseInt(Math.random() * data.length)
        console.log(id)
        let randomData = await products.getById(id || 1)
        res.status(200).json(randomData)
    } catch(error) {
        console.log(error)
    }
})


app.listen(app.get('port'), () =>
    console.log('SERVER READY IN PORT: '+app.get('port'))
)