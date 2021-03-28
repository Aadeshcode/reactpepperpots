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
  USER_UPDATE_MEMBERSHIP_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { auth } from "../firebase";
export const login = (token) => async (dispatch) => {

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      {},
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(userMembershipCheck())
    localStorage.removeItem("ppcartItems");
    localStorage.setItem("userCred", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {

  auth.signOut()
  localStorage.removeItem("userCred");
  localStorage.removeItem("ppcartItems");
  localStorage.removeItem("ppshippingAddress");
  localStorage.removeItem("pppaymentMethod");
  dispatch(userMembershipReset())
  dispatch(userReset())
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const register = (token) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    };

    const { data } = await axios.post(
      "/api/user/register",
      {},
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.clearItem("ppcartItems");
    // localStorage.setItem("userCred", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const usersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
    const {
      userToken: { token },
    } = getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.token}`,
      },
    }
    const { data } = await axios.get('/api/user', config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const userMembershipEdit = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_MEMBERSHIP_REQUEST
    })
    const {
      userToken: { token },
    } = getState()




    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.token}`,
      },
    }
    const { data } = await axios.put('/api/user/membership', {}, config)
    dispatch({
      type: USER_UPDATE_MEMBERSHIP_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_UPDATE_MEMBERSHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const userMembershipCheck = () => async (dispatch, getState) => {
  try {

    const {
      userToken: { token },
    } = getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.token}`,
      },
    }
    const { data } = await axios.get('/api/user/membership', config)
console.log("Checked")
    dispatch({
      type: 'USER_MEMBERSHIP',
      payload: data
    })
    localStorage.setItem("userMembership", JSON.stringify(data));
  } catch (error) {
    console.log(error)
  }
}
export const userMembershipReset = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_MEMBERSHIP_RESET',
    })
  } catch (error) {
    console.log(error)
  }
}
export const userReset = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_RESET',
    })
  } catch (error) {
    console.log(error)
  }
}