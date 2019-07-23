import * as actionTypes from "./actionTypes";
import axios from "axios";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (isAuth, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    isAuth: isAuth,
    userId: userId
  };
};

export const loginFail = (isAuth, message) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    isAuth: false,
    message: message
  };
};

export const setAuth = (isAuth, userId) => {
  return {
    type: actionTypes.SET_AUTH_STATUS,
    isAuth: isAuth,
    userId: userId
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const login = formData => {
  return dispatch => {
    dispatch(loginStart());
    axios
      .post("/login", formData)
      .then(res => {
        dispatch(loginSuccess(res.data["isAuth"], res.data["userId"]));
        localStorage.setItem("isAuth", res.data["isAuth"]);
        localStorage.setItem("userId", res.data["userId"]);
      })
      .catch(error => {
        if (error.response) {
          dispatch(loginFail(false, error.response.data.message));
        } else {
          dispatch(loginFail(false, "Serverio klaida. Pabandykite vėliau."));
        }
      });
  };
};

export const setAuthStatus = userId => {
  return dispatch => {
    axios
      .get("/user/" + userId.toString())
      .then(res => {
        dispatch(setAuth(res.data["isAuth"], res.data["userId"]));
      })
      .catch(err => {
        dispatch(setAuth(false));
        localStorage.removeItem("isAuth");
        localStorage.removeItem("userId");
      });
  };
};

export const handleLogout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("userId");
  return dispatch => {
    dispatch(logout());
  };
};
