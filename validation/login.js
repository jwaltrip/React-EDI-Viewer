const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // checks if email field is a properly formatted email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // checks if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  // checks if password is between 6-30 chars
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have at least 6 chars';
  }
  // checks if password is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  // return object that contains any errors (if there are any), and boolean value if isValid
  return {
    errors,
    isValid: isEmpty(errors)
  };
};