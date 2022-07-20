const { Router } = require("express");
const itemController = require('../controllers/item.controller');

const router = Router();

router.route('/')
// Thêm một vé bơi / đồ bơi
.post(itemController.createItem)
// Lấy ra tất cả vé bơi / đồ bơi
.get(itemController.getItems);

// người dùng mua vé bơi, thêm thông tin người dùng vào trong vé
router.route('/sign-ticket').post(itemController.signTicket);
// lấy ra vé đã mua của người dùng
router.route('owner-ticket').post(itemController.getOwnerTicket);

router.route('/categoryId')
// Lấy ra một danh mục
.get(itemController.getItemById)
// Cập nhật danh mục
.patch(itemController.updateItemById)
// Xóa một vé bơi / đồ bơi
.delete(itemController.deleteItemById);

module.exports = router;
