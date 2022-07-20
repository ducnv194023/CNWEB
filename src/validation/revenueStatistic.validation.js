const Joi = require('joi')

const getRevenueStatistic = {
  body: Joi.object().keys({
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  })
}

module.exports = {
  getRevenueStatistic
}
