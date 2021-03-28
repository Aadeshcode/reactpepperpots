import { CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_ADD_ITEM_FAIL, CART_DELETE_ITEM_REQUEST, CART_DELETE_ITEM_SUCCESS, CART_DELETE_ITEM_FAIL, CART_GET_ITEM_REQUEST, CART_GET_ITEM_SUCCESS, CART_GET_ITEM_FAIL, CART_CLEAR_ITEMS_REQUEST, CART_CLEAR_ITEMS_SUCCESS, CART_ITEMS_SELECT, CART_ITEMS_DESELECT, CART_SAVE_GIFT_MESSAGE } from "../constants/cartConstants"
import axios from 'axios'
import cogoToast from "cogo-toast"
export const addToCart = (cart) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
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
    const { data } = await axios.put('/api/cart', cart, config)
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: data
    })
    cogoToast.success("Sucessfully added to cart")

    try {
      dispatch({
        type: CART_GET_ITEM_REQUEST,
      })
      const { data } = await axios.get(`/api/cart`, config)
      console.log(data)
      dispatch({
        type: CART_GET_ITEM_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CART_GET_ITEM_FAIL,
        payload: error.message,
      })
      cogoToast.error(error.message)
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {

    }
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: message,
    })
  }

}

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_DELETE_ITEM_REQUEST,
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
    const { data } = await axios.delete(`/api/cart/${id}`, config)
    dispatch({
      type: CART_DELETE_ITEM_SUCCESS,
      payload: data
    })
    try {
      dispatch({
        type: CART_GET_ITEM_REQUEST,
      })
      const { data } = await axios.get(`/api/cart`, config)

      dispatch({
        type: CART_GET_ITEM_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CART_GET_ITEM_FAIL,
        payload: error.message,
      })
      cogoToast.error(error.message)
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {

    }
    dispatch({
      type: CART_DELETE_ITEM_FAIL,
      payload: message,
    })
  }

}





export const getCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_GET_ITEM_REQUEST,
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
    const { data } = await axios.get(`/api/cart`, config)
    dispatch({
      type: CART_GET_ITEM_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {

    }
    dispatch({
      type: CART_GET_ITEM_FAIL,
      payload: message,
    })
  }

}



export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('ppshippingAddress', JSON.stringify(data))
}
export const saveGiftMessage = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_GIFT_MESSAGE,
    payload: data,
  })
  localStorage.setItem('ppgiftMessage', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('pppaymentMethod', JSON.stringify(data))
}
export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: CART_CLEAR_ITEMS_REQUEST
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
  const { data } = await axios.delete(`/api/cart`, config)
  dispatch({
    type: CART_CLEAR_ITEMS_SUCCESS,
    payload: data
  })
  localStorage.removeItem('ppgiftMessage')
}

export const saveToCartSelect = (cartSelect) => async (dispatch, getState) => {
  const { cartSelect: { cartSelectItems } } = getState()
  const alreadyAdded = cartSelectItems.find((x) => x._id === cartSelect._id)
  await axios.put(`/api/cart/${cartSelect._id}`, { selected: true })
  if (alreadyAdded) {

  } else {
    dispatch({
      type: CART_ITEMS_SELECT,
      payload: cartSelect
    })

  }
}

export const removeFromCartSelect = (id) => async (dispatch, getState) => {

  const { cartSelect: { cartSelectItems } } = getState()

  const dataFiltered = cartSelectItems.filter((x) => x._id !== id)

  dispatch({
    type: CART_ITEMS_DESELECT,
    payload: dataFiltered
  })
  await axios.put(`/api/cart/${id}`, { selected: false })
}

export const updateToSelected = (id) => () => {
  localStorage.setItem('ppSelected', JSON.stringify())
}