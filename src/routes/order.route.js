const { Router } = require('express')
const OrderController = require('../controllers/order.controller')
const verifyToken = require('../middlewares/verifyToken')
const router = Router()
const OrderValidation = require('../validation/order.validation')

router.post('/', verifyToken, OrderValidation.createOrder, OrderController.createOrder)
router.patch('/pay-order', verifyToken, OrderController.payOrder)
router.patch('/:orderId', verifyToken, OrderValidation.updateOrder, OrderController.updateOrder)
router.get('/:orderId', verifyToken, OrderController.getOrder)

module.exports = router
