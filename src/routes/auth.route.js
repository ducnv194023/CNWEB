const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { authValidation } = require("../validation/auth.validation");
const verifyToken = require("../middlewares/verifyToken");
const router = Router();

router.post("/register", authValidation, AuthController.register);
router.post("/login", authValidation, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/", verifyToken, AuthController.getUser);

module.exports = router;
