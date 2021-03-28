import axios from "axios"
import cogoToast from "cogo-toast"
import { COLOR_CREATE_FAIL, COLOR_CREATE_REQUEST, COLOR_CREATE_RESET, COLOR_CREATE_SUCCESS, COLOR_DELETE_FAIL, COLOR_DELETE_REQUEST, COLOR_DELETE_SUCCESS, COLOR_DETAILS_FAIL, COLOR_DETAILS_REQUEST, COLOR_DETAILS_SUCCESS, COLOR_LIST_FAIL, COLOR_LIST_REQUEST, COLOR_LIST_SUCCESS, COLOR_UPDATE_FAIL, COLOR_UPDATE_REQUEST, COLOR_UPDATE_RESET, COLOR_UPDATE_SUCCESS } from "../constants/colorConstants"



export const createColors = (color) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_CREATE_REQUEST
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

        const { data } = await axios.post(`/api/color`, color, config);
        dispatch({
            type: COLOR_CREATE_SUCCESS,
            payload: data,
        });
        cogoToast.success("Color Created")
        dispatch({
            type: COLOR_CREATE_RESET
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
        }
        dispatch({
            type: COLOR_CREATE_FAIL,
            payload: message,
        });
    }

}

export const listColors = () => async (dispatch) => {
    try {
        dispatch({ type: COLOR_LIST_REQUEST });

        const { data } = await axios.get(`/api/color`);

        dispatch({
            type: COLOR_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COLOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listOneColor = (id) => async (dispatch) => {
    try {
        dispatch({ type: COLOR_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/color/${id}`);
        dispatch({
            type: COLOR_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COLOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateColor = (color) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_UPDATE_REQUEST,
        });

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
            `/api/color/${color._id}`,
            color,
            config
        );

        dispatch({
            type: COLOR_UPDATE_SUCCESS,
            payload: data,
        });

        cogoToast.success("Color Updated")
        dispatch({
            type: COLOR_UPDATE_RESET,

        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
        }
        dispatch({
            type: COLOR_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const colorDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_DELETE_REQUEST,
        });
        const {
            userToken: { token },
        } = getState()


        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token.token}`,
            },
        }


        const { data } = await axios.delete(`/api/color/${id}`, config);
        dispatch({
            type: COLOR_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
        }
        dispatch({
            type: COLOR_DELETE_FAIL,
            payload: message,
        });
    }
};