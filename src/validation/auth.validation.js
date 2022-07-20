const Joi = require('joi').defaults((schema) => schema.options({ allowUnknown: true }))
const { password } = require('./custom.validation')
const JoiCustomPhone = Joi.extend(require('joi-phone-number'))

const phoneValidate = JoiCustomPhone.string().required().phoneNumber({ defaultCountry: 'VN', format: 'e164', strict: true })

const register = {
  body: Joi.object().keys({
    phone: phoneValidate,
    password: Joi.string().required().custom(password)
  })
}

const login = {
  body: Joi.object().keys({
    phone: phoneValidate,
    password: Joi.string().required().custom(password)
  })
}

module.exports = {
  register,
  login
}
