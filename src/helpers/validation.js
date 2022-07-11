const {check} = require('express-validator');

const authValidation = [
    check('phone')
      .exists()
      .withMessage("Phone is empty")
      .isMobilePhone()
      .withMessage("Not a valid phone number"),
    check('password')
      .exists()
      .withMessage("Password is empty")
      .isLength({ min: 8 })
      .withMessage("Password length must be more than 8"),
];

module.exports = {
    authValidation
}