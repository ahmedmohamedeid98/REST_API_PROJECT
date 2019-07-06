const mongoose = require('mongoose')
const Product = require('../models/product')


exports.create_new_product = (req, res, next) => {
    //create new product to store in DB
    const product = new Product({
        _id: mongoose.Types.ObjectId(), //Generate new id. 
        name: req.body.name,
        price: req.body.price ,
        productImage: req.file.path
    });
    //save func provided by the mongoose to store data in the DB
    product.save().
    then(result => {
        //if successfully print the result
        res.status(201).json({
            message: "new, product add successfuly!",
            product: {
                name: result.name,
                price:result.price,
                id: result._id,
                productImage: result.productImage,
                url:'http://localhost:3000/products/' + result._id
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err.message
        })
    });
    
}

exports.get_all_products = (req, res, next) => {
    //find() use to find all collection we can use finc().where('here write query')
    //find().limit('...') to return specific numbers of the collections
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        if(docs){
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message: "Not Found Any Collection in DB!"
            })
        }
    })
    .catch(err =>{
        res.status(500).json({error: err})
    })
}

exports.get_one_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec() //we use exec to get true promise
    .then(doc =>{
        if(doc)
        {
            const response = {
                name: doc.name,
                price: doc.price,
                productImage: doc.productImage,
                url:  'http://localhost:3000/products/' + doc._id
            }
            res.status(200).json(response);
        }else{
            res.status(404).json({message: "NOT Fount collection with this ID"});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.update_one_product = (req, res, next)=>{
    const id = req.params.productId;
    const updateOps = {} //do this because if we nead update only specific num of properaty
    for(const ops of req.body){
        updateOps[ops.NameOps] = ops.value
    }
    Product.update({_id: id}, {$set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "product updated!"
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

exports.delete_one_products = (req, res, next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result =>{
        if(result.deletedCount){
            res.status(200).json({
                message: "delete Successfuly",
                count: result.deletedcount
            });
        }else{
            res.status(404).json({
                message: "Product Not Found!"
            })
        }
       
    })
    .catch(err =>{
        res.status(500).json({error: err});
    });
}