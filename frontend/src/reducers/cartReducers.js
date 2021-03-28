import { CART_ADD_ITEM_FAIL, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_CLEAR_ITEMS_FAIL, CART_CLEAR_ITEMS_REQUEST, CART_CLEAR_ITEMS_SUCCESS, CART_DELETE_ITEM_FAIL, CART_DELETE_ITEM_REQUEST, CART_DELETE_ITEM_SUCCESS, CART_GET_ITEM_FAIL, CART_GET_ITEM_REQUEST, CART_GET_ITEM_SUCCESS, CART_SAVE_GIFT_MESSAGE, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { ...state, loading: true }
    case CART_ADD_ITEM_SUCCESS:
      return { ...state, success: true }
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload }
    case CART_GET_ITEM_REQUEST:
      return { ...state, loading: true }
    case CART_GET_ITEM_SUCCESS:
      return { ...state, cartItems: action.payload, success: false, loading: false }
    case CART_GET_ITEM_FAIL:
      return { loading: true, ...state, error: action.payload }

    case CART_DELETE_ITEM_REQUEST:
      return {
        loading: false, ...state
      }
    case CART_DELETE_ITEM_SUCCESS:
      return {
        loading: false, success: true, ...state
      }
    case CART_DELETE_ITEM_FAIL:
      return {
        loading: false, ...state, success: false
      }
    case CART_SAVE_GIFT_MESSAGE:
      return {
        ...state,
        giftMessage: action.payload,
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_CLEAR_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: [],
        success: true,
      }
    case CART_CLEAR_ITEMS_FAIL:
      return {
        ...state,
        success: false,
        error: action.payload
      }
    default:
      return state
  }
}
