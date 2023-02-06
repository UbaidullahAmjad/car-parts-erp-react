/* eslint-disable no-unused-vars */
import {
    GET_BRAND_SEARCH_DATA,
    BRAND_SEARCH_DATA_LOAD_MORE,
    BRAND_SEARCH_DATA_LOAD_MORE_LOADER,
    BRAND_SEARCH_SUBMIT_LOADER,
    BRAND_SEARCH_DATA_CLEAR,
} from "../../../actionTypes"

const initialState = {
    brandDataList: [],
    pagination: null,
    loading: false,
    loadMoreBtnLoading: false,
    isError: false,
    errorMessage: null,
};

const BrandSearchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_BRAND_SEARCH_DATA: {
            console.log("GET_BRAND_SEARCH_DATA ------ REDUCERS --", payload);

            const current_brands = payload.brandDataList || [];
            let all_brands = [];
            if (payload.isError == false) {
                all_brands = [...state.brandDataList, ...current_brands];
            } else {
                all_brands = state.brandDataList;
            }
            console.log("all_brands", all_brands);
            const current_pagination = payload?.pagination || null;
            let final_pagination = state.pagination;
            if (current_pagination != null) {
                final_pagination = current_pagination;
            } else {
                final_pagination = state.pagination;
            }

            return {
                ...state,
                brandDataList: all_brands,
                pagination: final_pagination,
                loading: false,
                loadMoreBtnLoading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case BRAND_SEARCH_DATA_LOAD_MORE_LOADER: {
            console.log("BRAND_SEARCH_DATA_LOAD_MORE_LOADER ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload,
            };
        }
        case BRAND_SEARCH_DATA_CLEAR: {
            console.log("BRAND_SEARCH_DATA_CLEAR ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default BrandSearchReducer;