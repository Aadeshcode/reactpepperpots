import {
  COUPON_ADD_FAIL,
  COUPON_ADD_REQUEST,
  COUPON_ADD_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_EDIT_FAIL,
  COUPON_EDIT_REQUEST,
  COUPON_EDIT_SUCCESS,
  COUPON_GET_FAIL,
  COUPON_GET_REQUEST,
  COUPON_GET_SUCCESS,
  COUPON_ADD_RESET,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_ADD_USER_REQUEST,
  COUPON_ADD_USER_SUCCESS,
  COUPON_ADD_USER_FAIL
} from "../constants/couponConstants";
import axios from "axios";
export const addCoupons = (couponDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_ADD_REQUEST,
    });
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };

    const { data } = await axios.post("/api/coupon", couponDetails, config);
    dispatch({
      type: COUPON_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_ADD_FAIL,
      payload: error.message,
    });
  }
};
export const getCoupons = (formembers) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_GET_REQUEST,
    });
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };

    const { data } = await axios.get(`/api/coupon?${formembers}`, config);
    dispatch({
      type: COUPON_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_GET_FAIL,
      payload: error.message,
    });
  }
};
export const getCoupon = (couponCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_DETAILS_REQUEST,
    });
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };

    const { data } = await axios.get(`/api/coupon/${couponCode}`, config);
    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload: error.message,
    });
    console.log(error)

  }
};
export const editCoupons = (coupon) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_EDIT_REQUEST,
    });
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };

    const { data } = await axios.put("/api/coupon/", coupon, config);
    dispatch({
      type: COUPON_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_EDIT_FAIL,
      payload: error.message,
    });
  }
};
export const couponCreateReset = () => (dispatch) => {
  dispatch({
    type: COUPON_ADD_RESET
  })
}
export const coupongetReset = () => (dispatch) => {
  dispatch({
    type: 'COUPON_GET_RESET'
  })
}

export const deleteCoupon = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_DELETE_REQUEST
    })
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };
    const { data } = await axios.delete(`/api/coupon/${id}`, config);
    dispatch({
      type: COUPON_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COUPON_DELETE_FAIL,
      payload: error.message
    })
  }
}


export const addUserCoupons = (couponid) => async (dispatch, getState) => {
  console.log(couponid)
  try {
    dispatch({
      type: COUPON_ADD_USER_REQUEST,
    });
    const {
      userToken: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`,
      },
    };

    await axios.put(`/api/coupon/${couponid}`, {}, config);
    dispatch({
      type: COUPON_ADD_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COUPON_ADD_USER_FAIL,
      payload: error.message,
    });
  }
};