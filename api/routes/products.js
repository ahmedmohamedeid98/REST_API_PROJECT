const express = require('express');
const router = express.Router();
const multer = require('multer')
//check authorization
const checkAuth = require('../middleware/check-auth')

const productController = require('../controllers/products')

//=================== Manage Files =================//
//more about multer: https://github.com/expressjs/multer

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFliter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5,
    fileFilter: fileFliter
});
//=====================================================//

// POST NEW Product
router.post('/', checkAuth, upload.single('productImage'), productController.create_new_product);
// GET ALL Products
router.get('/', checkAuth, productController.get_all_products);
//GET ONE Product BY ID
router.get('/:productId',checkAuth, productController.get_one_product);
// UPDATA ONE Product BY ID
router.patch('/:productId',checkAuth, productController.update_one_product);
// DELETE ONE Product BY ID
router.delete('/:productId',checkAuth, productController.delete_one_products);

module.exports = router;