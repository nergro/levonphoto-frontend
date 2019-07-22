import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  loading: false,
  error: false,
  userId: "",
  checked: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: action.isAuth,
        userId: action.userId
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: action.isAuth,
        error: true
      };
    case actionTypes.SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: action.isAuth,
        userId: action.userId,
        checked: true
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
