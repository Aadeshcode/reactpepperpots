import { FAQ_CREATE_FAIL, FAQ_CREATE_REQUEST, FAQ_CREATE_RESET, FAQ_CREATE_SUCCESS, FAQ_DETAILS_FAIL, FAQ_DETAILS_REQUEST, FAQ_DETAILS_SUCCESS, FAQ_LIST_FAIL, FAQ_LIST_REQUEST, FAQ_LIST_SUCCESS, FAQ_UPDATE_FAIL, FAQ_UPDATE_REQUEST, FAQ_UPDATE_RESET, FAQ_UPDATE_SUCCESS } from "../constants/faqConstants,"
import axios from 'axios'
import { proxy } from './proxy'

export const createFaqs = (faq) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FAQ_CREATE_REQUEST
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

        const { data } = await axios.post(
            `/api/faq`,
            faq,
            config
        );
        dispatch({
            type: FAQ_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FAQ_CREATE_FAIL,
            payload: error.message
        })
    }
}

export const getFaqs = () => async (dispatch) => {
    try {
        dispatch({
            type: FAQ_LIST_REQUEST
        })

        const { data } = await axios.get(`${proxy}/api/faq`)

        dispatch({
            type: FAQ_LIST_SUCCESS,
            payload: data
        })
        dispatch({
            type: FAQ_UPDATE_RESET
        })
        dispatch({
            type: FAQ_CREATE_RESET
        })
    } catch (error) {
        dispatch({
            type: FAQ_LIST_FAIL,
            payload: error.message
        })
    }

}
export const getFaqsDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: FAQ_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/faq/${id}`)
        dispatch({
            type: FAQ_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FAQ_DETAILS_FAIL,
            payload: error.message
        })
    }

}

export const updateFaqs = (faq) => async (dispatch, getState) => {
    console.log(faq._id)
    try {
        dispatch({
            type: FAQ_UPDATE_REQUEST,
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

        const { data } = await axios.put(
            `/api/faq/${faq._id}`,
            faq,
            config
        );
        console.log(data)
        dispatch({
            type: FAQ_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FAQ_UPDATE_FAIL
        })
    }
}