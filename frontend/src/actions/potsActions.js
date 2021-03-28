import {
  POTS_CREATE_FAIL,
  POTS_CREATE_REQUEST,
  POTS_CREATE_RESET,
  POTS_CREATE_SUCCESS,
  POTS_DELETE_FAIL,
  POTS_DELETE_REQUEST,
  POTS_DELETE_SUCCESS,
  POTS_DETAILS_FAIL,
  POTS_DETAILS_REQUEST,
  POTS_DETAILS_RESET,
  POTS_DETAILS_SUCCESS,
  POTS_DETAILSTYPE_FAIL,
  POTS_DETAILSTYPE_REQUEST,
  POTS_DETAILSTYPE_SUCCESS,
  POTS_LIST_FAIL,
  POTS_LIST_REQUEST,
  POTS_LIST_SUCCESS,
  POTS_UPDATE_FAIL,
  POTS_UPDATE_REQUEST,
  POTS_UPDATE_RESET,
  POTS_UPDATE_SUCCESS,
  POTS_FORLISTSCREEN_REQUEST,
  POTS_FORLISTSCREEN_SUCCESS,
  POTS_FORLISTSCREEN_FAIL,
  POTS_CREATE_REVIEW_REQUEST,
  POTS_CREATE_REVIEW_SUCCESS,
  POTS_CREATE_REVIEW_FAIL,
  
} from "../constants/potsConstants";
import axios from "axios";
import cogoToast from "cogo-toast";


// just gives hyde ezra groot not sizes, this is for potsStoreScreen
export const listPots = (pageNumber = '', key = '' , sortBy="") => async (dispatch) => {
  try {
    dispatch({ type: POTS_LIST_REQUEST });

    const { data } = await axios.get(`/api/pots?pageNumber=${pageNumber}&keyword=${key}&sortBy=${sortBy}`);

    dispatch({
      type: POTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//gives every pots small medium and large for everypots
export const listPotsListScreen = () => async (dispatch) => {
  try {
    dispatch({ type: POTS_FORLISTSCREEN_REQUEST });

    const { data } = await axios.get(`/api/pots/all`);

    dispatch({
      type: POTS_FORLISTSCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POTS_FORLISTSCREEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//according to id that is to the lowest level
export const listOnePot = (id) => async (dispatch) => {
  try {
    dispatch({ type: POTS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/pots/${id}`);
    dispatch({
      type: POTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//according to slug
export const listOnePotDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: POTS_DETAILSTYPE_REQUEST });

    const { data } = await axios.get(`/api/pots/details/${slug}`);
    dispatch({
      type: POTS_DETAILSTYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POTS_DETAILSTYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const potDetailsReset = () => (dispatch) => {
  try {
    dispatch({
      type: POTS_DETAILS_RESET
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
    dispatch({
      type: POTS_UPDATE_FAIL,
      payload: message,
    });
  }
}
export const updatePot = (pot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POTS_UPDATE_REQUEST,
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
      `/api/pots/${pot._id}`,
      pot,
      config
    );

    dispatch({
      type: POTS_UPDATE_SUCCESS,
      payload: data,
    });
    cogoToast.success("Your product is Updated")
    dispatch({
      type: POTS_UPDATE_RESET,
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
      type: POTS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createPots = (potData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POTS_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/pots`, potData, config);
    dispatch({
      type: POTS_CREATE_SUCCESS,
      payload: data,
    });
    cogoToast.success("Your product is Created")
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
    dispatch({
      type: POTS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const potCreateReset = () => (dispatch) => {
  dispatch({
    type: POTS_CREATE_RESET,
  });
};

export const potDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POTS_DELETE_REQUEST,
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


    const { data } = await axios.delete(`/api/pots/${id}`, config);
    dispatch({
      type: POTS_DELETE_SUCCESS,
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
      type: POTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const potUpdateReset = () => (dispatch) => {
  dispatch({
    type: POTS_UPDATE_RESET,
  });
};

export const createPotReview = (potId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POTS_CREATE_REVIEW_REQUEST,
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


    await axios.post(`/api/pots/${potId}/reviews`, review, config)

    dispatch({
      type: POTS_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {

    }
    dispatch({
      type: POTS_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}
export const getPotsSuggestions = () => async (dispatch) => {
  const { data } = await axios.get('/api/pots/suggestions/mightlike')
  dispatch({
    type: 'GET_POTS_SUGGESTIONS',
    payload: data
  })
}