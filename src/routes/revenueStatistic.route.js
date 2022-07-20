const { Router } = require("express");
const RevenueStatisticController = require("../controllers/revenueStatitic.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = Router();

// TODO: them validate
router.post("/", verifyToken, RevenueStatisticController.getRevenueStatistic);

module.exports = router;
