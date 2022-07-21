const { Router } = require('express')
const itemController = require('../controllers/item.controller')
const itemValidation = require('../validation/item.validation')
const auth = require('../middlewares/verifyToken')
const validate = require('../middlewares/validate')

const router = Router()

// Thêm một vé bơi / đồ bơi
router.route('/').post(auth, validate(itemValidation.createItem), itemController.createItem)

// Lấy ra tất cả vé bơi / đồ bơi
router.route('/pagination').post(auth, validate(itemValidation.getItems), itemController.getItems)

// người dùng mua vé bơi, thêm thông tin người dùng vào trong vé
router.route('/sign-ticket').post(auth, validate(itemValidation.signTicket), itemController.signTicket)
// lấy ra vé đã mua của người dùng
router.route('/owner-ticket').post(auth, validate(itemValidation.getOwnerTicket), itemController.getOwnerTicket)
// người dùng mua đồ bơi, thêm thông tin người dùng
router.route('/sign-swimmingwear').post(auth, validate(itemValidation.signSwimmingWear), itemController.signSwimmingWear)

router.route('/:itemId')
// Lấy ra một danh mục
  .get(auth, itemController.getItemById)
// Cập nhật danh mục
  .patch(auth, validate(itemValidation.updateItem), itemController.updateItemById)
// Xóa một vé bơi / đồ bơi
  .delete(auth, itemController.deleteItemById)

module.exports = router
