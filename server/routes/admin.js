const express = require('express');
const path = require('path')
const router = express.Router();
const product = require('../controllers/shop')
const admin = require('../controllers/admin')

router.get('/add-product', admin.getAddProduct);
router.post('/add-product', admin.postAddProduct);

router.get('/delete-product/:id', admin.getDeleteProduct)

router.get('/edit-product/:id', admin.getEditProduct)
router.post('/edit-product/:id', admin.postEditProduct)


router.get('/products', admin.fetchAll)



module.exports = router;