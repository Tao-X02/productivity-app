// Import dependencies
import Validator from "validator";
import isEmpty from "is-empty";

const validateLogin = (data) => {
    let errors = {};

    // Validate inputs
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Check email
    if (Validator.isEmpty(data.email)) {
        errors.email = "email field is required";
    }

    // Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateLogin;