const { SystemMsg } = require('../utils/Message')

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message(SystemMsg.joiWrongFormatErroMsg)
  }
  return value
}

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message(SystemMsg.passwordFailedLength)
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(SystemMsg.passwordFailedMixCharacterCondition)
  }
  return value
}

module.exports = {
  objectId,
  password
}
