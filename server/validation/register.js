const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

  // check name input field length is between 2-30 chars
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 chars';
  }
  // check name field is not empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  // check email field is a properly formatted email string
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // check email field is not empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  // check password field length is between 6-30 chars
  if (!Validator.isLength(data.password, { min:6, max: 30 })) {
    errors.password = 'Password must have 6 chars';
  }
  // check password field is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // check password confirm field is between 6-30 chars
  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = 'Password must have 6 chars';
  }
  // check password and password confirm fields are equal
  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Password and Confirm Password must match';
  }
  // check password confirm field is not empty
  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Confirm password is required';
  }

  // return object that contains any errors (if there are any), and boolean value if isValid
  return {
    errors,
    isValid: isEmpty(errors)
  };
};