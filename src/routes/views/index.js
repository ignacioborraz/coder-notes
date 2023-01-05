const express = require('express')
const router = express.Router()

const views = require('./views.js')

router.use('/', views)

module.exports = router