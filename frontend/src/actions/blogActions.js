import {
    BLOG_ADD_FAIL, BLOG_ADD_REQUEST, BLOG_ADD_SUCCESS, BLOG_GET_REQUEST, BLOG_GET_SUCCESS,
    BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_DETAILS_FAIL, BLOG_ADD_RESET, BLOG_GET_FAIL, 
    BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS,BLOG_UPDATE_RESET, BLOG_DELETE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS, BLOG_UPDATE_FAIL
} from "../constants/blogConstants"
import axios from 'axios'
import cogoToast from "cogo-toast"
export const addBlogs = (blog) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_ADD_REQUEST
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

        const { data } = await axios.post('/api/blog', blog, config)
        dispatch({
            type: BLOG_ADD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BLOG_ADD_FAIL,
            payload: error.message
        })
        cogoToast.error(error.message)
    }
}
export const updateBlogs = (blog) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_UPDATE_REQUEST
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

        const { data } = await axios.put(`/api/blog/${blog.slug}`, blog, config)
        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type:BLOG_UPDATE_RESET
        })
    } catch (error) {
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.message
        })
        cogoToast.error(error.message)
    }
}

export const getBlogs = () => async (dispatch) => {
    try {
        dispatch({
            type: BLOG_GET_REQUEST
        })
        const { data } = await axios.get('/api/blog')
        dispatch({
            type: BLOG_GET_SUCCESS,
            payload: data
        })
        dispatch({
            type: BLOG_ADD_RESET
        })
    } catch (error) {
        dispatch({
            type: BLOG_GET_FAIL,
            payload: error.message
        })
    }
}
export const getoneBlog = (slug) => async (dispatch) => {
    try {
        dispatch({
            type: BLOG_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/blog/${slug}`)
        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.message
        })
    }
}
export const deleteBlog = (slug) => async (dispatch) => {
    try {
        dispatch({
            type: BLOG_DELETE_REQUEST
        })
        const { data } = await axios.delete(`/api/blog/${slug}`)
        dispatch({
            type: BLOG_DELETE_SUCCESS,
            payload: data
        })
        cogoToast.success("Sucessfully Deleted")
        dispatch(getBlogs())
    } catch (error) {
        dispatch({
            type: BLOG_DELETE_FAIL,
            payload: error.message
        })
        cogoToast.error(error.message)
    }
} 