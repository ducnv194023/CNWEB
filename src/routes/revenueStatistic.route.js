const { Router } = require("express");
const RevenueStatisticController = require("../controllers/revenueStatitic.controller");
const verifyToken = require("../middlewares/verifyToken");
const RevenueStatisticValidation = require("../validation/revenueStatistic.validation");
const router = Router();

router.post("/", verifyToken, RevenueStatisticValidation.getRevenueStatistic, RevenueStatisticController.getRevenueStatistic);

module.exports = router;
