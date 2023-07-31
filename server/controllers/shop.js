const adminData = require('../routes/admin')
// const Cart = require('../models/cart')
const Product = require('../models/products')

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render("shop/index", {
            pageTitle: 'Home', 
            path: '/', 
            prods: products
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            pageTitle: 'Product list', 
            path: '/products', 
            prods: products
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getProductDetails = (req, res, next) => {
    const productID = req.params.id
    Product.findById(productID)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: 'Details', 
                path: '/products', 
                product: product
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Cart', 
                path: '/cart', 
                products: products
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postCart = (req, res, next) => {
    const productID = req.body.productID

    Product.findById(productID)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.productId
    req.user
        .deleteItemFromCart(productId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postOrder = (req, res, next) => {
    let fetchedCart
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders', 
                path: '/orders', 
                orders: orders
            })
        })
        .catch(err => {
            console.log(err)
        })


}
















