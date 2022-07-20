const { Router } = require("express");
const OrderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = Router();

// TODO: them validate
router.post("/", verifyToken, OrderController.createOrder);
router.patch("/pay-order", verifyToken, OrderController.payOrder);
router.get("/:orderId", verifyToken, OrderController.getOrder);

module.exports = router;
