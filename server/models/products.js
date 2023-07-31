const { getDb } = require("../../util/database");
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

class Product {
    constructor(title, price, imageUrl, description, id, userId) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id == null ? null : new ObjectId(id);
        this.userId = userId
    }

    save(){
        const db = getDb()
        let dbOp
        if(this._id){
            // update the product
            dbOp = db.collection('products').updateOne(
                { _id: this._id },
                { $set: this }
            )
        }else{
            // insert new product
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static fetchAll(){
        const db = getDb().collection('products')
        return db.find()
            .toArray()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findById(id){
        const db = getDb().collection('products')
        return db.findOne({_id: new ObjectId(id)})
            .then(product => {
                return product
            })
            .catch(err => {
                console.log(err)
            })
    }

    static deleteById(id){
        const db = getDb()
        return db.collection('products')
            .deleteOne({_id: new ObjectId(id)})
            .then(product => {
                console.log('Deleted product')
            })
            .catch(err => {
                console.log(err)
            })
    }
}


module.exports = Product