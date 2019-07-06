const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

exports.create_new_order =  (req, res, next) => {
    Product.findById(req.body.productId)
    .exec()
    .then(prod => {
        if(!prod)
        {
            return res.status(404).json({message:"Product Not Found!"})
        }else{
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            order.save()
            .then(result => {
                res.status(201).json({message: "Order Created Successfuly!"})
            })
            .catch( err=>{
                res.status(500).json({error: err.message})
            })
        
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err.message,
            message: "Product Not Found"
        })
    })
       
}

exports.get_all_orders =  (req, res, next) => {
    Order.find()
    .select('quantity _id product')
    .populate('product', '_id name price')
    .exec()
    .then(docs =>{
        if(docs.length > 0)
        {
            res.status(200).json({
                count: docs.length,
                order: docs.map(doc => {
                    return{
                        _id: doc._id,
                        quantity: doc.quantity,
                        product: doc.product,
                        order_url: 'http://localhost:3000/orders/' + doc._id
                    }
                })
            })
        }else{
            res.status(404).json({
                message: "No Orders found"
            })
        }
        
    })
    .catch(err =>{
        res.status(500).json({error :err.message})
    })

}

exports.get_one_order =  (req, res, next) => {
    const id = req.params.orderId
    Order.findById({_id: id})
    .select('_id quantity product')
    .populate('product', '_id name price')
    .exec()
    .then(doc => {
        res.status(200).json({
            _id: doc._id,
            quantity: doc.quantity,
            product: doc.product,
            order_url: 'http://localhost:3000/orders/' + doc._id

        })
    })
    .catch(err =>{
        res.status(500).json({
            message: "no Order with this ID",
            error: err.message
        })
    })
}

exports.update_one_order = (req, res, next) => {
    const id = req.params.orderId
    const updateOps = {}
    for(op of req.body)
    {
        updateOps[op.NameOps] = op.value
    }
    Order.updateOne({_id: id}, {$set: updateOps })
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Order Updated!"
        })
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
}

exports.delete_one_order =  (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({_id: id})
    .exec()
    .then(result =>{
        if(result.deletedCount)
        {
            res.status(200).json({
                message: "Order Deleted!"
            })
        }else{
            res.status(404).json({
                message: "Order Not Found!"
            })
        }
        
    })
    .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
}
