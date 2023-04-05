const express = require('express')
const router = express.Router()
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrder} = require('../controllers/orderController.js')
const {protect} = require('../authMiddleware.js')

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


module.exports = router;




