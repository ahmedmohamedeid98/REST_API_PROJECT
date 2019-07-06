const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const orderController = require('../controllers/orders')


// CREATE NEW Order
router.post('/',checkAuth, orderController.create_new_order)
// GET ALL Orders
router.get('/',checkAuth, orderController.get_all_orders)
//GET ONE Order
router.get('/:orderId',checkAuth, orderController.get_one_order)
// UPDATE ONE Order
router.patch('/:orderId',checkAuth, orderController.update_one_order)
// DELETE ONE Order
router.delete('/:orderId',checkAuth, orderController.delete_one_order)

module.exports = router;