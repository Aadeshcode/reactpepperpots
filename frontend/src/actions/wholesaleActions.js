import { WHOLESALE_ADD_FAIL, WHOLESALE_ADD_REQUEST, WHOLESALE_ADD_SUCCESS, WHOLESALE_GET_FAIL, WHOLESALE_GET_REQUEST, WHOLESALE_GET_SUCCESS } from "../constants/wholesalersConstants"
import axios from 'axios'
import cogoToast from "cogo-toast"
export const addWholesale = (wholesale) => async (dispatch) => {
    try {
        dispatch({
            type: WHOLESALE_ADD_REQUEST
        })
        const { data } = await axios.post('/api/wholesale', wholesale)
        dispatch({
            type: WHOLESALE_ADD_SUCCESS,
            payload: data
        })
        cogoToast.success("Your request has been submitted. Our representative will be in touch with you shortly")
    } catch (error) {
        dispatch({
            type: WHOLESALE_ADD_FAIL,
            payload: error.message
        })
        cogoToast.error(error.message)
    }
}
export const getWholesale = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: WHOLESALE_GET_REQUEST
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

        const { data } = await axios.get('/api/wholesale', config)
        dispatch({
            type: WHOLESALE_GET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: WHOLESALE_GET_FAIL,
            payload: error.message
        })
    }
}