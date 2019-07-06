const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//routes
const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const usersRouter = require('./api/routes/users')

//mongo connection
//----------------------------------Need Change --------------------------------------
// ex: "mongodb+srv://<<database-name>>:"+ process.env.MONGO_ATLAS_PW +"@<<cluster-name>>-lrnfi.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect("you link to mongo here",{
    useNewUrlParser: true
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// create static end point to get uploaded image 
app.use('/uploads',express.static('uploads'))
//prevent CORS Error: Cross-Origin-Resouse-Sharing
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin', 'X-Requested-With',
    'Content-type', 'Access', 'Authorization');

    if(req.method == "OPTIONS")
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({});
    }
    next();
});

//filter routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

//Error Handeling
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;