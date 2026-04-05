const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')



const transactionRoutes = express.Router()

transactionRoutes.post('/', authMiddleware,)


module.exports = transactionRoutes;