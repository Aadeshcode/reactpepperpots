import { WHOLESALE_ADD_FAIL, WHOLESALE_ADD_REQUEST, WHOLESALE_ADD_SUCCESS, WHOLESALE_GET_FAIL, WHOLESALE_GET_REQUEST, WHOLESALE_GET_SUCCESS } from "../constants/wholesalersConstants";

export const addWholesaleReducer = (state = { }, action) => {
    switch (action.type) {
        case WHOLESALE_ADD_REQUEST:
            return { loading: true, requests: [] };
        case WHOLESALE_ADD_SUCCESS:
            return { loading: false, requests: [] };
        case WHOLESALE_ADD_FAIL:
            return { loading: false, requests: [], error: action.payload }
        default:
            return state;
    }
};
export const getWholesaleReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case WHOLESALE_GET_REQUEST:
            return { loading: true, requests: [] };
        case WHOLESALE_GET_SUCCESS:
            return { loading: false, requests: action.payload };
        case WHOLESALE_GET_FAIL:
            return { loading: false, requests: [], error: action.payload }
        default:
            return state;
    }
};