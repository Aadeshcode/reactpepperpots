import { GET_REST_DETAILS_FAIL, GET_REST_DETAILS_REQUEST, GET_REST_DETAILS_SUCCESS, GET_REST_FAIL, GET_REST_REQUEST, GET_REST_SUCCESS, UPDATE_REST_DETAILS_FAIL, UPDATE_REST_DETAILS_REQUEST, UPDATE_REST_DETAILS_RESET, UPDATE_REST_DETAILS_SUCCESS } from "../constants/restConstants"

export const restListReducer = (state = { rest: {} }, action) => {

    switch (action.type) {
        case GET_REST_REQUEST:
            return { ...state, loading: true }
        case GET_REST_SUCCESS:
            return { loading: false, rest: action.payload }
        case GET_REST_FAIL:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}
export const restDetailsReducer = (state = { rest: "" }, action) => {

    switch (action.type) {
        case GET_REST_DETAILS_REQUEST:
            return { ...state, loading: true }
        case GET_REST_DETAILS_SUCCESS:
            return { loading: false, rest: action.payload }
        case GET_REST_DETAILS_FAIL:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}
export const restUpdateReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_REST_DETAILS_REQUEST:
            return { loading: true }
        case UPDATE_REST_DETAILS_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_REST_DETAILS_FAIL:
            return { error: action.payload, loading: false }
        case UPDATE_REST_DETAILS_RESET:
            return {loading: false }
        default:
            return state
    }
}