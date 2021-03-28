import {
  COUPON_ADD_FAIL,
  COUPON_ADD_REQUEST,
  COUPON_ADD_RESET,
  COUPON_ADD_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_GET_FAIL,
  COUPON_GET_REQUEST,
  COUPON_GET_SUCCESS,
  COUPON_DELETE_RESET
} from "../constants/couponConstants";

export const getCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPON_GET_REQUEST:
      return { loading: true, coupons: [] };
    case COUPON_GET_SUCCESS:
      return { loading: false, coupons: action.payload };
    case COUPON_GET_FAIL:
      return { loading: false, coupons: [], error: action.payload };
    default:
      return state;
  }
};
export const getCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return { loading: true, coupon: {} };
    case COUPON_DETAILS_SUCCESS:
      return { loading: false, coupon: action.payload };
    case COUPON_DETAILS_FAIL:
      return { loading: false, coupon: {}, error: action.payload };
    case 'COUPON_GET_RESET':
      return { loading: false, coupon: {} };
    default:
      return state;
  }
};
export const addCouponReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case COUPON_ADD_REQUEST:
      return { loading: true, success: false };
    case COUPON_ADD_SUCCESS:
      return { loading: false, success: true };
    case COUPON_ADD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COUPON_ADD_RESET:
      return { loading: false, success: false };

    default:
      return state;
  }
};
export const deleteCouponReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true, success: false };
    case COUPON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUPON_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COUPON_DELETE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

