const { Router } = require('express')
const RevenueStatisticController = require('../controllers/revenueStatitic.controller')
const RevenueStatisticValidation = require('../validation/revenueStatistic.validation')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')
const router = Router()

router.post('/', verifyToken, validate(RevenueStatisticValidation.getRevenueStatistic), RevenueStatisticController.getRevenueStatistic)

module.exports = router
