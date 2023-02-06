/* eslint-disable no-unused-vars */
import {
    GET_MODELS_LIST_BY_HOME_MANUFACTURER,
    HOME_MODELS_LOAD_MORE,
    MODELS_LIST_BY_HOME_MANUFACTURER_CLEAR,
    GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED,
} from "../../actionTypes"

const initialState = {
    modelsList: [],
    pagination: null,
    loadMoreBtnLoading: false,
    loading: true,
    isError: false,
    errorMessage: null,
};

const HomeModelsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MODELS_LIST_BY_HOME_MANUFACTURER: {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER ------ REDUCERS --", payload);
            const current_models = payload.modelsList || [];
            const all_models = [...state.modelsList, ...current_models];
            console.log("all_models", all_models);
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
                state.current_page = current_pagination.current_page
            }

            return {
                ...state,
                modelsList: all_models,
                pagination: final_pagination || null,
                loadMoreBtnLoading: false,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case HOME_MODELS_LOAD_MORE: {
            console.log("HOME_MODELS_LOAD_MORE ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload
            }
        }
        case MODELS_LIST_BY_HOME_MANUFACTURER_CLEAR: {
            console.log("HOME_MANUFACTURERS_CLEAR_LIST ------ REDUCERS --");
            return initialState;
        }
        case GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED: {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ REDUCERS --", payload);
            const all_models_list = payload.modelsList || [];
            console.log("all_models_list", all_models_list);
            const current_pagination = payload?.pagination || null;

            return {
                ...state,
                modelsList: all_models_list,
                pagination: current_pagination,
                loadMoreBtnLoading: false,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default:
            return state;
    }
}

export default HomeModelsReducer;