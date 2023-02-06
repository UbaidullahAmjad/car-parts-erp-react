/* eslint-disable no-unused-vars */
import {
    GET_ENGINES_LIST_BY_HOME_MANUFACTURER,
    HOME_ENGINES_LOAD_MORE,
    ENGINES_LIST_BY_HOME_MANUFACTURER_CLEAR,
    ENGINE_DETAILED_DATA_BY_HOME_SEARCH,
    ENGINE_DETAILED_DATA_CLEAR,
    GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED,
} from "../../actionTypes"

const initialState = {
    enginesList: [],
    pagination: null,
    loadMoreBtnLoading: false,
    engineDetailedData: null,
    loading: true,
    isError: false,
    errorMessage: null,
};

const HomeEnginesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ENGINES_LIST_BY_HOME_MANUFACTURER: {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER ------ REDUCERS --", payload);
            const current_models = payload.enginesList || [];
            const all_models = [...state.enginesList, ...current_models];
            console.log("all_models", all_models);
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
                state.current_page = current_pagination.current_page
            }

            return {
                ...state,
                enginesList: all_models,
                pagination: final_pagination || null,
                loadMoreBtnLoading: false,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case HOME_ENGINES_LOAD_MORE: {
            console.log("HOME_ENGINES_LOAD_MORE ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload
            }
        }
        case ENGINES_LIST_BY_HOME_MANUFACTURER_CLEAR: {
            console.log("ENGINES_LIST_BY_HOME_MANUFACTURER_CLEAR ------ REDUCERS --");
            return initialState;
        }
        case GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED: {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ REDUCERS --", payload);
            const all_engines_list = payload.enginesList || [];
            console.log("all_models_list", all_engines_list);
            const current_pagination = payload?.pagination || null;

            return {
                ...state,
                enginesList: all_engines_list,
                pagination: current_pagination,
                loadMoreBtnLoading: false,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ENGINE_DETAILED_DATA_BY_HOME_SEARCH: {
            console.log("ENGINE_DETAILED_DATA_BY_HOME_SEARCH ------ REDUCERS --", payload);
            let engine_data = null;
            if (payload.isError == false) {
                engine_data = payload.engineDetailedData;
            }
            return {
                ...state,
                engineDetailedData: engine_data,
            }
        }
        case ENGINE_DETAILED_DATA_CLEAR: {
            console.log("ENGINE_DETAILED_DATA_CLEAR ------ REDUCERS --");
            return {
                ...state,
                engineDetailedData: null,
            }
        }
        default:
            return state;
    }
}

export default HomeEnginesReducer;