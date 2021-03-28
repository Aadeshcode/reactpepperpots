import axios from "axios"
import {
    GET_REST_DETAILS_FAIL,
    GET_REST_DETAILS_REQUEST, GET_REST_DETAILS_SUCCESS, GET_REST_FAIL,
    GET_REST_REQUEST, GET_REST_SUCCESS, UPDATE_REST_DETAILS_FAIL, UPDATE_REST_DETAILS_REQUEST,
    UPDATE_REST_DETAILS_RESET, UPDATE_REST_DETAILS_SUCCESS
} from "../constants/restConstants"
import { proxy } from './proxy'
export const updateRest = (route, info) => async (dispatch) => {
    console.log(route, info)
    try {
        dispatch({
            type: UPDATE_REST_DETAILS_REQUEST
        })
        const { data } = await axios.put(`/api/rest/${route}`, info)
        dispatch({
            type: UPDATE_REST_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_REST_DETAILS_FAIL,
            payload: error.message
        })
    }
}
export const getAllRest = () => async (dispatch) => {

    try {
        dispatch({
            type: GET_REST_REQUEST
        })

        const { data } = await axios.get('/api/rest')

        dispatch({
            type: GET_REST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_REST_FAIL,
            payload: error.messages
        })
    }
}


export const getRestDetails = (route) => async (dispatch) => {

    try {
        dispatch({
            type: GET_REST_DETAILS_REQUEST
        })

        const { data } = await axios.get(`${proxy}/api/rest/${route}`)

        dispatch({
            type: GET_REST_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_REST_DETAILS_FAIL,
            payload: error.messages
        })
    }
}
export const resetUpdateRest = () => (dispatch) => {
    dispatch({
        type: UPDATE_REST_DETAILS_RESET
    })
}