const { Router } = require('express')
const OrderController = require('../controllers/order.controller')
const OrderValidation = require('../validation/order.validation')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')
const router = Router()

router.post('/', verifyToken, validate(OrderValidation.createOrder), OrderController.createOrder)
router.patch('/pay-order', verifyToken, OrderController.payOrder)
router.patch('/:orderId', verifyToken, validate(OrderValidation.updateOrder), OrderController.updateOrder)
router.get('/:orderId', verifyToken, OrderController.getOrder)

module.exports = router
