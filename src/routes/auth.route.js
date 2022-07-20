const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const authValidation = require("../validation/auth.validation");
const verifyToken = require("../middlewares/verifyToken");
const router = Router();

router.post("/register", authValidation.register, AuthController.register);
router.post("/login", authValidation.login, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/", verifyToken, AuthController.getUser);

module.exports = router;
