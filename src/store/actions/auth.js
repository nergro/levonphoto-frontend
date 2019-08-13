import { loginUser } from "../../services/levonDB";
import { fetchAll } from "./main";

export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const CHECK_USER = "CHECK_USER";
export const LOGOUT = "LOGOUT";

export const authLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

export const authFailed = () => {
  return {
    type: AUTH_FAILED
  };
};

export const loginSuccess = userId => {
  return {
    type: LOGIN_SUCCESS,
    userId
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const login = formData => async (dispatch, getState) => {
  dispatch(authLoading());
  try {
    const userId = await loginUser(formData);
    localStorage.setItem("userId", userId);
    dispatch(loginSuccess(userId));
  } catch {
    dispatch(authFailed());
  }
};

export const checkUser = () => async (dispatch, getState) => {
  const userId = localStorage.getItem("userId");
  dispatch(fetchAll());
  if (userId) {
    dispatch(loginSuccess(userId));
  }
};

export const handleLogout = () => async (dispatch, getState) => {
  localStorage.removeItem("userId");
  dispatch(logout());
};
