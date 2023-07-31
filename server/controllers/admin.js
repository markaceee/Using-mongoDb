const Product = require('../models/products')
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

exports.fetchAll = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render("admin/products", {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body
    let newProduct = new Product(title, price, imageUrl, description, null, req.user._id)
    newProduct
        .save()
        .then(result => {
            console.log('Added new product')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
    
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    const productID = req.params.id
    if (!editMode) {
        return res.redirect('/')
    }

    Product.findById(productID)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit product',
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body
    const id = req.params.id
    const product = new Product(title, price, imageUrl, description, id)
    product
        .save()
        .then(result => {
            res.redirect("/admin/products")
        })
        .catch(err => console.log(err))
}

exports.getDeleteProduct = (req, res, next) => {
    let deleteProductById = req.params.id
    Product.deleteById(deleteProductById)
        .then(result => {
            res.redirect("/admin/products")
        })
        .catch(err => console.log(err))
   
}