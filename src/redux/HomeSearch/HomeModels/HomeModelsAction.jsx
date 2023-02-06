/* eslint-disable no-unused-vars */
import {
    GET_MODELS_LIST_BY_HOME_MANUFACTURER,
    HOME_MODELS_LOAD_MORE,
    MODELS_LIST_BY_HOME_MANUFACTURER_CLEAR,
    GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED,
} from "../../actionTypes"
import axios from "axios";
import { URL } from "../../../env";

export const GetModels_List_ByMaufacturer_Action = (page_no, type, sub_type, manuId) => {
    console.log("GetModels_List_ByMaufacturer_Action called");

    console.log("GetModels_List_ByMaufacturer_Action props:", `page_no=${page_no} type=${type} sub_type=${sub_type} manuId=${manuId}`);

    return async (dispatch) => {
        var modelsList = [];
        var pagination = null;
        var mainType = "";
        var subType = "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_models_by_manufacturer_home_search_react`, {
            params: {
                page: page_no,
                type: type,
                sub_type: sub_type,
                manufacturer_id: manuId,
            }
        }).then((response) => {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER ------ ACTIONS -- Response", response);

            modelsList = response.data.models
            pagination = response.data.pagination;
            isError = false;
            dispatch({
                type: GET_MODELS_LIST_BY_HOME_MANUFACTURER,
                payload: {
                    modelsList,
                    pagination,
                    mainType: type,
                    subType: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_MODELS_LIST_BY_HOME_MANUFACTURER,
                payload: {
                    modelsList,
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

export const Models_List_LoadMoreClickedAction = () => {
    console.log("Models_List_LoadMoreClickedAction called");
    return (dispatch) => {
        dispatch({
            type: HOME_MODELS_LOAD_MORE,
            payload: true,
        });
    }
}

export const Models_List_ClearAction = () => {
    console.log("Models_List_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: MODELS_LIST_BY_HOME_MANUFACTURER_CLEAR,
        });
    }
}

export const GetModels_List_ByMaufacturer_Searched_Action = (type, sub_type, manuId) => {
    console.log("GetModels_List_ByMaufacturer_Searched_Action called");

    console.log("GetModels_List_ByMaufacturer_Searched_Action props:", `type=${type} sub_type=${sub_type} manuId=${manuId}`);

    return async (dispatch) => {
        var modelsList = [];
        var pagination = null;
        var mainType = "";
        var subType = "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_all_home_models_react_search`, {
            params: {
                name: "", /** to get all list  */
                type: type,
                sub_type: sub_type,
                manufacturer_id: manuId,
            }
        }).then((response) => {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ ACTIONS -- Response", response);

            modelsList = response.data.models
            isError = false;
            dispatch({
                type: GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED,
                payload: {
                    modelsList,
                    pagination,
                    mainType: type,
                    subType: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_MODELS_LIST_BY_HOME_MANUFACTURER_SEARCHED,
                payload: {
                    modelsList,
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
