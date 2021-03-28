import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_PAY_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_REQUEST, ORDER_DELIVER_REQUEST, ORDER_PAY_SUCCESS, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DISPATCH_REQUEST, ORDER_DISPATCH_FAIL, ORDER_DISPATCH_SUCCESS, ORDER_DISPATCH_RESET } from "../constants/orderConstants"
import axios from 'axios'
import cogoToast from "cogo-toast"
import { clearCart } from "./cartActions"
// import { CART_CLEAR_ITEMS } from "../constants/cartConstants"
export const createOrder = (order) => async (dispatch, getState) => {
    console.log(order)
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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
        const { data } = await axios.post('/api/order', order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        cogoToast.success("Order Placed Sucessfully")
        dispatch(clearCart())
    } catch (error) {

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {

        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }

}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.get(`/api/order/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {

        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const orderList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.get('/api/order', config)
        dispatch({
            type: ORDER_LIST_SUCCESS,
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
            type: ORDER_LIST_FAIL,
            payload: message,
        })
    }
}
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })
        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.get('/api/order/myorders', config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
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
            type: ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}



export const updateOrderToPaid = (datas) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.put(`/api/order/${datas._id}/pay`, datas, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {

        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.put(`/api/order/${id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {

        }
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: message,
        })
    }
}
export const updateOrderToDispatched = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DISPATCH_REQUEST,
        })

        const {
            userToken: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token.token}`,
            },
        }

        const { data } = await axios.put(`/api/order/${id}/dispatch`, {}, config)

        dispatch({
            type: ORDER_DISPATCH_SUCCESS,
            payload: data,
        })
        setTimeout(() => {
            dispatch({
                type: ORDER_DISPATCH_RESET
            })
        }, 3000);
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {

        }
        dispatch({
            type: ORDER_DISPATCH_FAIL,
            payload: message,
        })
    }
}