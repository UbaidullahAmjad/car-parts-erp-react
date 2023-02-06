/* eslint-disable no-unused-vars */
import * as Types from "../../actionTypes"
import axios from "axios";
import { URL } from "../../../env";

export const GetHomeManufacturersListAction = (page_no) => {
    console.log("GetHomeManufacturersListAction called");

    return async (dispatch) => {
        console.log("GetHomeManufacturersListAction called----");
        var homeManufacturersList = [];
        var pagination = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_all_home_manufacturers_react`, {
            params: {
                page: page_no,
            }
        }).then((response) => {
            console.log("GET_HOME_MANUFACTURERS_LIST ------ ACTIONS -- Response", response);
            homeManufacturersList = response.data.manufacturers;
            pagination = response.data.pagination;
            isError = false;
            dispatch({
                type: Types.GET_HOME_MANUFACTURERS_LIST,
                payload: {
                    homeManufacturersList,
                    pagination,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("GET_HOME_MANUFACTURERS_LIST ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: Types.GET_HOME_MANUFACTURERS_LIST,
                payload: {
                    homeManufacturersList,
                    pagination,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const HomeManufact_LoadMoreClickedAction = () => {
    console.log("HomeManufact_LoadMoreClickedAction called");
    return (dispatch) => {
        dispatch({
            type: Types.HOME_MANUFACTURERS_LOAD_MORE,
            payload: true,
        });
    }
}

export const HomeManufacturer_ClearAction = () => {
    console.log("HomeManufacturer_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: Types.HOME_MANUFACTURERS_CLEAR_LIST,
        });
    }
}

export const GetManufacturersSubType_Type_List_Action = (page_no, sub_type, type) => {
    // console.log("GetManufacturersSubType_Type_List_Action called");

    console.log("GetManufacturersSubType_Type_List_Action props:", `page_no=${page_no} sub_type=${sub_type} type=${type}`);

    return async (dispatch) => {
        var homeManufacturersList = [];
        var pagination = null;
        var mainType = "";
        var subType = "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_home_manufacturers_react`, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // },
            params: {
                page: page_no,
                sub_type: sub_type,
                type: type,
            }
        }).then((response) => {
            console.log("GET_HOME_MANUFACTURERS_LIST_SUB_TYPE ------ ACTIONS -- Response", response);

            homeManufacturersList = response.data.manufacturers
            pagination = response.data.pagination;
            isError = false;
            dispatch({
                type: Types.GET_HOME_MANUFACTURERS_LIST_SUB_TYPE,
                payload: {
                    homeManufacturersList,
                    pagination,
                    mainType: type,
                    subType: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_HOME_MANUFACTURERS_LIST_SUB_TYPE ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: Types.GET_HOME_MANUFACTURERS_LIST_SUB_TYPE,
                payload: {
                    homeManufacturersList,
                    pagination,
                    mainType,
                    subType,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

