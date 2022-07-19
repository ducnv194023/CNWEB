const { Router } = require("express");
const itemController = require('../controllers/item.controller');

const router = Router();

router.route('/')
// Thêm một vé bơi / đồ bơi
.post(itemController.createItem)
// Lấy ra tất cả vé bơi / đồ bơi
.get(itemController.getItems);


router.route('/categoryId')
// Lấy ra một danh mục
.get(itemController.getItemById)
// Cập nhật danh mục
.patch(itemController.updateItemById)
// Xóa một vé bơi / đồ bơi
.delete(itemController.deleteItemById);

module.exports = router;
