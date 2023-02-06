/* eslint-disable no-unused-vars */
import {
    GET_BRAND_SEARCH_DATA,
    BRAND_SEARCH_DATA_LOAD_MORE,
    BRAND_SEARCH_DATA_LOAD_MORE_LOADER,
    BRAND_SEARCH_SUBMIT_LOADER,
    BRAND_SEARCH_DATA_CLEAR,
} from "../../../actionTypes"
import axios from "axios";
import { URL } from "../../../../env";
import SweetAlert from "sweetalert2";
import { toast } from "react-toastify";


export const GetBrandSearchDataAction = (page_no) => {
    console.log("GetBrandSearchDataAction called");

    console.log("GetBrandSearchDataAction props:", `page_no=${page_no}`);

    return async (dispatch) => {
        var brandDataList = [];
        var pagination = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_brands_react`, {
            params: {
                page: page_no,
            }
        }).then((response) => {
            console.log("GET_BRAND_SEARCH_DATA ------ ACTIONS -- Response", response);

            brandDataList = response.data?.brands || [];
            isError = false;

            dispatch({
                type: GET_BRAND_SEARCH_DATA,
                payload: {
                    brandDataList,
                    pagination: response.data?.pagination,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_BRAND_SEARCH_DATA ------ ACTIONS -- Response-Error", error);

            const errorResponse = error.response?.data || null;

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_BRAND_SEARCH_DATA,
                payload: {
                    brandDataList,
                    pagination,
                    loading,
                    isError,
                    errorMessage: errorResponse,
                }
            })
        })
    }
}


export const BrandSearchData_LoadMore_LoaderAction = () => {
    console.log("BrandSearchData_LoadMore_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: BRAND_SEARCH_DATA_LOAD_MORE_LOADER,
            payload: true,
        });
    }
}

export const BrandSearchData_ClearAction = () => {
    console.log("BrandSearchData_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: BRAND_SEARCH_DATA_CLEAR,
        });
    }
}