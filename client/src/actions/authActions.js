// Imports modules
import axios from "axios";
import jwt_decode from "jwt-decode";

// Import from files
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Signup a user
export const SignupUser = (user, history) => dispatch => {
    axios
        .post("/api/v1/users/register", user)
        .then((res) => history.push("/login"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

// Login a user
export const LoginUser = (user) => dispatch => {
    axios
        .post("/api/v1/users/login", user)
        .then((res) => {
            // Save token to local storage, decode, and set current user
            localStorage.setItem("jwtToken", res.data.token);
            setAuthToken(res.data.token);
            const decoded = jwt_decode(res.data.token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Define set current user function
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
}

// Logout a user
export const LogoutUser = () => dispatch => {
    // Remove user
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}