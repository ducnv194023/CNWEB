const { Router } = require('express')
const router = Router()
const AuthRouter = require('./auth.route')
const ItemRouter = require('./item.route')
const OrderRouter = require('./order.route')
const RevenueStatisticRouter = require('./revenueStatistic.route')

router.use('/auth', AuthRouter)
router.use('/items', ItemRouter)
router.use('/orders', OrderRouter)
router.use('/revenue-statistics', RevenueStatisticRouter)

module.exports = router
