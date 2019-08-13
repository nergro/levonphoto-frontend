import {
  AUTH_LOADING,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/auth";

const initialState = {
  isAuth: false,
  loading: false,
  error: false,
  userId: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        userId: action.userId
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
