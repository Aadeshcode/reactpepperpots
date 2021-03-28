import { BLOG_ADD_FAIL, BLOG_ADD_RESET, BLOG_ADD_REQUEST, BLOG_ADD_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_GET_FAIL, BLOG_GET_REQUEST, BLOG_GET_SUCCESS, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS, BLOG_DELETE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS, BLOG_UPDATE_FAIL, BLOG_UPDATE_RESET } from "../constants/blogConstants"

export const blogsListReducer = (state = { blogs: [] }, action) => {

    switch (action.type) {
        case BLOG_GET_REQUEST:
            return { ...state, loading: true }
        case BLOG_GET_SUCCESS:
            return { loading: false, blogs: action.payload }
        case BLOG_GET_FAIL:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}
export const blogsDetailsReducer = (state = { blog: {} }, action) => {

    switch (action.type) {
        case BLOG_DETAILS_REQUEST:
            return { ...state, loading: true }
        case BLOG_DETAILS_SUCCESS:
            return { loading: false, blog: action.payload }
        case BLOG_DETAILS_FAIL:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}
export const blogCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_ADD_REQUEST:
            return { loading: true, ...state }
        case BLOG_ADD_SUCCESS:
            return { loading: false, success: true }
        case BLOG_ADD_FAIL:
            return { loading: false, success: false, error: action.payload }
        case BLOG_ADD_RESET:
            return { loading: false, success: false }
        default:
            return state
    }
}
export const blogDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_DELETE_REQUEST:
            return { ...state, loading: true }
        case BLOG_DELETE_SUCCESS:
            return { loading: false, success: true }
        case BLOG_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload }
        default:
            return state
    }
}
export const blogUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_UPDATE_REQUEST:
            return { ...state, loading: true }
        case BLOG_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case BLOG_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload }
        case BLOG_UPDATE_RESET:
            return { loading: false, success: false }
        default:
            return state
    }
}
