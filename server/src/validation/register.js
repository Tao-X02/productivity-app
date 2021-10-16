// Import dependencies
import Validator from "validator";
import isEmpty from "is-empty";

const validateSignup = (data) => {
    let errors = {};

    // Validate inputs
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    // Check first name
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    // Check last name
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }

    // Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // Check password2
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    // Check email
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required";
    }

    // Check if passwords match
    if (!Validator.equals(data.password, data.password2)) {
        errors.passwordMatch = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateSignup;