/* eslint-disable no-unused-vars */
import * as Types from "../../actionTypes"

const initialState = {
    manufacturersList: [],
    homeManufacturersList: [],
    pagination: null,
    loadMoreBtnLoading: false,
    loading: true,
    isError: false,
    errorMessage: null,
};

const HomeManufacturersReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.GET_HOME_MANUFACTURERS_LIST: {
            console.log("GET_HOME_MANUFACTURERS_LIST ------ REDUCERS --", payload);
            const current_manufacturers = payload.homeManufacturersList || [];
            const all_manufacturers = [...state.homeManufacturersList, ...current_manufacturers];
            console.log("all_manufacturers", all_manufacturers);
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
                state.current_page = current_pagination.current_page
            }

            return {
                ...state,
                manufacturersList: all_manufacturers,
                homeManufacturersList: all_manufacturers,
                pagination: final_pagination || null,
                loadMoreBtnLoading: false,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case Types.HOME_MANUFACTURERS_LOAD_MORE: {
            console.log("HOME_MANUFACTURERS_LOAD_MORE ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload
            }
        }
        case Types.HOME_MANUFACTURERS_CLEAR_LIST: {
            console.log("HOME_MANUFACTURERS_CLEAR_LIST ------ REDUCERS --");
            return initialState;
        }
        case Types.GET_HOME_MANUFACTURERS_LIST_SUB_TYPE: {
            console.log("GET_HOME_MANUFACTURERS_LIST_SUB_TYPE ------ REDUCERS --", payload);
            const mainType = payload.mainType;
            const subType = payload.subType;

            const current_manufacturers = payload.homeManufacturersList || [];
            const all_manufacturers = [...state.homeManufacturersList, ...current_manufacturers];
            console.log("all_manufacturers", all_manufacturers);
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
                state.current_page = current_pagination.current_page
            }

            return {
                ...state,
                manufacturersList: all_manufacturers,
                homeManufacturersList: all_manufacturers,
                pagination: final_pagination || null,
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

export default HomeManufacturersReducers;