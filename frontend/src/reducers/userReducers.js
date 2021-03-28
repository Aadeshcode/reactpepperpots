import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_MEMBERSHIP_FAIL,
  USER_UPDATE_MEMBERSHIP_REQUEST,
  USER_UPDATE_MEMBERSHIP_RESET,
  USER_UPDATE_MEMBERSHIP_SUCCESS,
} from "../constants/userConstants";


export const userLoggedInReducer = (state = "", action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { token: action.payload }
    case "USER_RESET":
      return {  }

    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: 'Your account has been created successfully' };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userMembershipReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_MEMBERSHIP_REQUEST:
      return { loading: true };
    case USER_UPDATE_MEMBERSHIP_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_MEMBERSHIP_FAIL:
      return { loading: false, succes: false, error: action.payload };
    case USER_UPDATE_MEMBERSHIP_RESET:
      return {};
    default:
      return state;
  }
};
export const userMembershipCheckReducer = (state = {}, action) => {
  switch (action.type) {

    case 'USER_MEMBERSHIP':
      return action.payload;
    case 'USER_MEMBERSHIP_RESET':
      return {};
    default:
      return state;
  }
};
