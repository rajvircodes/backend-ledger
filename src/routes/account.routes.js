const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware');
const createAccountController = require('../controllers/account.controller');


const router = express.Router()



/**
 * - POST /api/account
 * - create new account 
 */

router.post("/",authMiddleware.authMiddleware, createAccountController)



module.exports = router