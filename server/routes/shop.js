const express = require('express')
const path = require('path')
const router = express.Router()
const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex)

router.get('/product/:id', shopController.getProductDetails)

router.get('/products', shopController.getProducts)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.post('/cart-delete-product', shopController.postDeleteCartProduct)

router.post('/create-order', shopController.postOrder)
router.get('/orders', shopController.getOrders)



module.exports = router;