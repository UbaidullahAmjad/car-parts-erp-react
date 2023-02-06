/* eslint-disable no-unused-vars */
import {
    GET_PRODUCT_GROUP_SEARCH_DATA,
    PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE,
    PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE_LOADER,
    PRODUCT_GROUP_SEARCH_SUBMIT_LOADER,
    PRODUCT_GROUP_SEARCH_DATA_CLEAR,
} from "../../../actionTypes"
import axios from "axios";
import { URL } from "../../../../env";
import SweetAlert from "sweetalert2";
import { toast } from "react-toastify";


export const GetProductGroupSearchDataAction = (brand_id) => {
    console.log("GetProductGroupSearchDataAction called");

    console.log("GetProductGroupSearchDataAction props:", `brand_id=${brand_id}`);

    return async (dispatch) => {
        var productGroupList = [];
        var sectionCount = 0;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_sub_sections__by_brands_react`, {
            params: {
                section_count: 0,
                brand_id: brand_id
            }
        }).then((response) => {
            console.log("GET_PRODUCT_GROUP_SEARCH_DATA ------ ACTIONS -- Response", response);

            productGroupList = response.data?.sections || [];
            sectionCount = response.data?.section_count || 0;
            isError = false;

            dispatch({
                type: GET_PRODUCT_GROUP_SEARCH_DATA,
                payload: {
                    productGroupList,
                    sectionCount,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_PRODUCT_GROUP_SEARCH_DATA ------ ACTIONS -- Response-Error", error.response);

            const errorResponse = error.response?.data || null;

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_PRODUCT_GROUP_SEARCH_DATA,
                payload: {
                    productGroupList,
                    sectionCount,
                    loading,
                    isError,
                    errorMessage: errorResponse,
                }
            })
        })
    }
}

export const GetProductGroupSearch_LoadMoreData_Action = (section_count, brand_id) => {
    console.log("GetProductGroupSearch_LoadMoreData_Action called");

    console.log("GetProductGroupSearch_LoadMoreData_Action props:", `section_count=${section_count} brand_id=${brand_id}`);

    return async (dispatch) => {
        var productGroupList = [];
        var sectionCount = 0;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_sub_sections__by_brands_react`, {
            params: {
                section_count: section_count,
                brand_id: brand_id
            }
        }).then((response) => {
            console.log("PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE ------ ACTIONS -- Response", response);

            productGroupList = response.data?.sections || [];
            sectionCount = response.data?.section_count || 0;
            isError = false;

            dispatch({
                type: PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE,
                payload: {
                    productGroupList,
                    sectionCount,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE ------ ACTIONS -- Response-Error", error.response);

            const errorResponse = error.response?.data || null;

            isError = true;
            errorMessage = error.response
            dispatch({
                type: PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE,
                payload: {
                    productGroupList,
                    sectionCount,
                    loading,
                    isError,
                    errorMessage: errorResponse,
                }
            })
        })
    }
}

export const ProductGroupSearchData_LoadMore_LoaderAction = () => {
    console.log("ProductGroupSearchData_LoadMore_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: PRODUCT_GROUP_SEARCH_DATA_LOAD_MORE_LOADER,
            payload: true,
        });
    }
}

export const ProductGroupSearchData_ClearAction = () => {
    console.log("ProductGroupSearchData_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: PRODUCT_GROUP_SEARCH_DATA_CLEAR,
        });
    }
}