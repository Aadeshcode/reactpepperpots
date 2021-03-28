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
    POTS_DETAILSTYPE_RESET,
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
    POTS_CREATE_REVIEW_RESET,
} from "../constants/potsConstants";

export const potListReducer = (state = { pots: [] }, action) => {
    switch (action.type) {
        case POTS_LIST_REQUEST:
            return { loading: true, pots: [] };
        case POTS_LIST_SUCCESS:
            return {
                loading: false,
                pots: action.payload.storePots,
                page: action.payload.page,
                pages: action.payload.pages
            };
        case POTS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const potListScreenReducer = (state = { pots: [] }, action) => {
    switch (action.type) {
        case POTS_FORLISTSCREEN_REQUEST:
            return { loading: true, pots: [] };
        case POTS_FORLISTSCREEN_SUCCESS:
            return {
                loading: false,
                pots: action.payload,
            };
        case POTS_FORLISTSCREEN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const potDetailsReducer = (state = { size: "", colors: [], name: "", selectedColors: [], reviews: [] }, action) => {
    switch (action.type) {
        case POTS_DETAILS_REQUEST:
            return { ...state, loading: true };
        case POTS_DETAILS_SUCCESS:
            return action.payload
        case POTS_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case POTS_DETAILS_RESET:
            return { loading: false };
        default:
            return state;
    }
};
export const potDetailsTypeReducer = (state = { pots: [{ image: "", name: "", price: "", colors: [] }] }, action) => {
    switch (action.type) {
        case POTS_DETAILSTYPE_REQUEST:
            return { ...state, loading: true };
        case POTS_DETAILSTYPE_SUCCESS:
            return { loading: false, pots: action.payload }
        case POTS_DETAILSTYPE_FAIL:
            return { loading: false, ...state, error: action.payload };
        case POTS_DETAILSTYPE_RESET:
            return { loading: false };
        default:
            return state;
    }
};


export const potUpdateReducer = (state = { pot: {} }, action) => {
    switch (action.type) {
        case POTS_UPDATE_REQUEST:
            return { loading: true };
        case POTS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case POTS_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case POTS_UPDATE_RESET:
            return { pot: {} };
        default:
            return state;
    }
};

export const potCreateReducer = (state = { pot: {}, success: [] }, action) => {
    switch (action.type) {
        case POTS_CREATE_REQUEST:
            return { loading: true, ...state };
        case POTS_CREATE_SUCCESS:
            return { loading: false, success: [...state.success, `${action.payload.size}`], pot: action.payload };
        case POTS_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case POTS_CREATE_RESET:
            return { loading: false, pot: {}, success: [] };
        default:
            return state;
    }
};
export const potDeleteReducer = (state = { deleted: "" }, action) => {
    switch (action.type) {
        case POTS_DELETE_REQUEST:
            return { loading: true };
        case POTS_DELETE_SUCCESS:
            return { loading: false, deleted: action.payload };
        case POTS_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};


export const potReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POTS_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case POTS_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case POTS_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case POTS_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const potsSuggestionReducer = (state = { pots: [] }, action) => {
    switch (action.type) {
        case 'GET_POTS_SUGGESTIONS':
            return { pots: action.payload };
        default:
            return state
    }
}
