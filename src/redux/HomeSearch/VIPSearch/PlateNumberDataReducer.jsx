/* eslint-disable no-unused-vars */
import {
    GET_PLATE_NUMBER_DATA,
    PLATE_NUMBER_DATA_LOADER,
    PLATE_NUMBER_DATA_CLEAR,
    ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA,
    ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA_LOADER,
    ENGINES_LIST_BY_PLATE_NUMBER_DATA_CLEAR,
    ENGINE_DETAILED_DATA_BY_PLATE_NUMBER,
    ENGINE_DETAILED_DATA_PLATE_NUMBER_CLEAR,
} from "../../actionTypes"

const initialState = {
    plateNumberData: null,
    enginesList: [],
    engineDetailedData: null,
    pagination: null,
    loadMoreBtnLoading: false,
    type: null,
    sub_type: null,
    model_id: null,
    loading: false,
    isError: false,
    errorMessage: null,
};

const PlateNumberDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PLATE_NUMBER_DATA: {
            console.log("GET_PLATE_NUMBER_DATA ------ REDUCERS --", payload);
            const plate_number_data = payload.plateNumberData || null;

            return {
                ...state,
                plateNumberData: plate_number_data,
                enginesList: payload?.enginesList || [],
                pagination: payload?.pagination || null,
                type: payload?.type || null,
                sub_type: payload?.sub_type || null,
                model_id: payload.model_id,
                loading: false,
                loadMoreBtnLoading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PLATE_NUMBER_DATA_LOADER: {
            return {
                ...state,
                loading: payload,
            }
        }
        case ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA: {
            console.log("ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA ------ REDUCERS --", payload);
            const current_engine_list = payload.enginesList || [];
            const all_engines = [...state.enginesList, ...current_engine_list];
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
            }

            return {
                ...state,
                enginesList: all_engines,
                pagination: final_pagination,
                loadMoreBtnLoading: false,
            }
        }
        case ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA_LOADER: {
            console.log("ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA_LOADER ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload
            }
        }
        case ENGINES_LIST_BY_PLATE_NUMBER_DATA_CLEAR: {
            console.log("ENGINES_LIST_BY_PLATE_NUMBER_DATA_CLEAR ------ REDUCERS --");
            return {
                ...state,
                enginesList: [],
                pagination: null,
                loadMoreBtnLoading: false,
            };
        }
        case ENGINE_DETAILED_DATA_BY_PLATE_NUMBER: {
            console.log("ENGINE_DETAILED_DATA_BY_PLATE_NUMBER ------ REDUCERS --", payload);
            let engine_data = null;
            if (payload.isError == false) {
                engine_data = payload.engineDetailedData;
            }
            return {
                ...state,
                engineDetailedData: engine_data
            }
        }
        case ENGINE_DETAILED_DATA_PLATE_NUMBER_CLEAR: {
            console.log("ENGINE_DETAILED_DATA_BY_PLATE_NUMBER ------ REDUCERS --");
            return {
                ...state,
                engineDetailedData: null,
            }
        }
        case PLATE_NUMBER_DATA_CLEAR: {
            console.log("PLATE_NUMBER_DATA_CLEAR ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default PlateNumberDataReducer;