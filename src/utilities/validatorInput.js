const validator = require("validator");

exports.checkEmpty = function checkEmpty(data) {
  return data === undefined || data === null || validator.isEmpty(data.trim());
};
exports.checkMinLength = function checkMinLength(data, minStr) {
  return data.trim().length >= minStr;
};
exports.checkMaxLength = function checkMaxLength(data, maxStr) {
  return data.trim().length <= maxStr;
};
exports.checkEmail = function checkEmail(data) {
  return validator.isEmail(data.trim());
};
