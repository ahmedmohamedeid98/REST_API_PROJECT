const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../models/user')

exports.user_sign_in = (req,res,next)=>{
    //we should check if email is exist or not
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if(result.length >= 1){
            // 409 mean that the email is found but there is a conflict
            return res.status(409).json({message: 'email exist!'})
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        message : "faild to encrypt password!",
                        error:err
                    })
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        // you must store encrypted password note your password
                        // more details: https://github.com/kelektiv/node.bcrypt.js
                        password: hash
                    })
                    user.save()
                    .then(result => {
                        res.status(200).json({
                            message: "User Successfully sign up!"
                        })
                    })
                    .catch(err =>{
                        res.status(500).json({
                            message : "failed to sign up!",
                            error: err.message
                        })
                    })
                }
            })
        }
    })
}

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Auth faild, email does't exist"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, is_valid) => {
            if(is_valid){
                const token = JWT.sign({id: user[0]._id, email: user[0].email}, process.env.JWT_PRIVATE_KEY, {expiresIn: "1h"});
                return res.status(200).json({
                    message: "Auth successful!",
                    token: token
                })
            }else{
                return res.status(401).json({
                message: "Auth faild, wrong password"
                })
            }
    })
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
}

exports.user_delete_account = (req, res, next) => {

    User.deleteOne({_id: req.params.userId})
    .then(result => {
        if(result.deletedCount){
            res.status(200).json({
                message: 'user deleted!'
            })
        }else{
            res.status(404).json({
                message: 'user not exist!'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err.message
        })
    })
}