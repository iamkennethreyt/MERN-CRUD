const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";

  if (!validator.isLength(data.firstname, { min: 4, max: 40 })) {
    errors.firstname = "First name must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (!validator.isLength(data.lastname, { min: 4, max: 40 })) {
    errors.lastname = "Last name must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
