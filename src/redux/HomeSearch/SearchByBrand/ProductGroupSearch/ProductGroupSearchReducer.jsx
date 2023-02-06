/* eslint-disable no-unused-vars */
import {
    GET_PRODUCT_GROUP_SEARCH_DATA,
    PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE,
    PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE_LOADER,
    PRODUCT_GROUP_SEARCH_SUBMIT_LOADER,
    PRODUCT_GROUP_SEARCH_DATA_CLEAR,
} from "../../../actionTypes"

const initialState = {
    productGroupList: [],
    loading: false,
    loadMoreBtn: true,
    loadMoreBtnLoading: false,
    sectionCount: 0,
    isError: false,
    errorMessage: null,
};

const ProductGroupSearchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT_GROUP_SEARCH_DATA: {
            console.log("GET_PRODUCT_GROUP_SEARCH_DATA ------ REDUCERS --", payload);

            const current_brands = payload.productGroupList || [];

            let load_more_btn = true
            if (payload.isError == false && (current_brands == null || current_brands.length == 0)) {
                load_more_btn = false
            }
            let section_count = 0;
            if(payload.isError == false && (current_brands != null || current_brands.length > 0)) {
                section_count = payload.sectionCount;
            }else {
                section_count = state.sectionCount;
            }

            return {
                ...state,
                productGroupList: current_brands,
                loading: false,
                loadMoreBtn: load_more_btn,
                loadMoreBtnLoading: false,
                sectionCount: section_count,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE: {
            console.log("PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE ------ REDUCERS --", payload);

            const current_brands = payload.productGroupList || [];
            let all_product_groups = [];
            if (payload.isError == false) {
                all_product_groups = [...state.productGroupList, ...current_brands];
            } else {
                all_product_groups = state.productGroupList;
            }
            // console.log("all_product_groups", all_product_groups);
            let section_count = 0;
            if(payload.isError == false && current_brands.length > 0) {
                section_count = payload.sectionCount;
            } else {
                section_count = state.sectionCount;
            }

            let load_more_btn = true
            if (payload.isError == false && (current_brands == null || current_brands.length == 0)) {
                load_more_btn = false
            }

            let all_product_groups_sort = all_product_groups.sort((a, b) => a.articleNumber > b.articleNumber ? 1 : -1)

            return {
                ...state,
                productGroupList: all_product_groups_sort,
                loading: false,
                loadMoreBtn: load_more_btn,
                loadMoreBtnLoading: false,
                sectionCount: section_count,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE_LOADER: {
            console.log("PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE_LOADER ------ REDUCERS --", payload);
            return {
                ...state,
                loadMoreBtnLoading: payload,
            };
        }
        case PRODUCT_GROUP_SEARCH_DATA_CLEAR: {
            console.log("PRODUCT_GROUP_SEARCH_DATA_CLEAR ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default ProductGroupSearchReducer;