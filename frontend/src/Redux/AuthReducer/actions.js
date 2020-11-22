import {
  LOGINFAILURE,
  LOGINREQUEST,
  LOGINSUCCESS,
  SIGNUPFAILURE,
  SIGNUPREQUEST,
  SIGNUPSUCCESS,
  LOGOUT
} from "./actionTypes";
import axios from "axios";
export const loginRequest = () => ({
  type: LOGINREQUEST,
});

export const loginSuccess = (payload) => ({
  type: LOGINSUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGINFAILURE,
  payload,
});

export const login = (payload) => (dispatch) => {
  dispatch(loginRequest());
  axios
    .post("http://localhost:5000/login", payload)
    .then((res) => dispatch(loginSuccess(res.data.user)))
    .catch((err) => dispatch(loginFailure(err.response.data)));
};

export const signupRequest = () => ({
  type: SIGNUPREQUEST,
});

export const signupSuccess = (payload) => ({
  type: SIGNUPSUCCESS,
  payload,
});

export const signupFailure = (payload) => ({
  type: SIGNUPFAILURE,
  payload,
});

export const signUp = (payload) => (dispatch) => {
  dispatch(signupRequest());
  axios
    .post("http://localhost:5000/register", payload)
    .then((res) => dispatch(signupSuccess(res.data)))
    .catch((err) => dispatch(signupFailure(err.response.data)));
};

export const logout = () => ({
  type: LOGOUT
})
