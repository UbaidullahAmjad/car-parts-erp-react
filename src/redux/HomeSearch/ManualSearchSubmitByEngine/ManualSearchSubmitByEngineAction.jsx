/* eslint-disable no-unused-vars */
import {
    GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA,
    MANUAL_SEARCH_SUBMIT_LOADER,
    GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE,
    MANUAL_SEARCH_SUBMIT_LOAD_MORE_LOADER,
    MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_CLEAR,
} from "../../actionTypes"
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";
import { toast } from "react-toastify";

export const GetManualSearchSubmitDataByEngineAction = (engine_id, type, sub_type, navigate) => {
    console.log("GetManualSearchSubmitDataAction called");

    console.log("GetManualSearchSubmitDataAction props:", `engine_id=${engine_id} type=${type} sub_type=${sub_type}`);

    return async (dispatch) => {
        var manualSearchData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_search_sections_by_engine_react`, {
            params: {
                engine_id: engine_id,
                type: type,
                sub_type: sub_type,
            }
        }).then((response) => {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA ------ ACTIONS -- Response", response);

            manualSearchData = response.data || null
            isError = false;

            if (manualSearchData?.unique && manualSearchData?.unique.length != 0) {
                navigate("/searched-model-view", { state: { containData: true } });
            }

            dispatch({
                type: GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA,
                payload: {
                    manualSearchData,
                    engine_id: engine_id,
                    type: type,
                    sub_type: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA ------ ACTIONS -- Response-Error", error);

            const errorResponse = error.response?.data || null;
            if (errorResponse?.error && errorResponse?.error == true) {
                SweetAlert.fire({
                    icon: "error",
                    title: "Engine Result",
                    text: "Sorry, Engine not found!!",
                    confirmButtonText: "OK",
                });
            }

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA,
                payload: {
                    manualSearchData,
                    engine_id: null,
                    type: null,
                    sub_type: null,
                    loading,
                    isError,
                    errorMessage: errorResponse,
                }
            })
        })
    }
}

export const ManualSearchSubmitData_LoaderAction = () => {
    console.log("ManualSearchSubmitData_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: MANUAL_SEARCH_SUBMIT_LOADER,
            payload: true,
        });
    }
}

export const GetManualSearchSubmitDataByEngine_LoadMoreAction = (engine_id, type, sub_type) => {
    console.log("GetManualSearchSubmitDataByEngine_LoadMoreAction called");

    console.log("GetManualSearchSubmitDataByEngine_LoadMoreAction props:", `engine_id=${engine_id} type=${type} sub_type=${sub_type}`);

    return async (dispatch) => {
        var manualSearchData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_search_sections_by_engine_load_more_react`, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // },
            params: {
                engine_id: engine_id,
                type: type,
                sub_type: sub_type,
            }
        }).then((response) => {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE ------ ACTIONS -- Response", response);

            manualSearchData = response.data || null
            isError = false;

            // if (manualSearchData?.unique && manualSearchData?.unique.length != 0) {
            // }

            toast.success("Data Loaded", {
                position: toast.POSITION.TOP_RIGHT,
            })

            dispatch({
                type: GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE,
                payload: {
                    manualSearchData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE ------ ACTIONS -- Response-Error", error.response);

            const errorResponse = error.response?.data;
            if (errorResponse?.error && errorResponse?.error == true) {
                SweetAlert.fire({
                    icon: "error",
                    title: "Engine Result",
                    text: "Sorry, Engine not found!!",
                    confirmButtonText: "OK",
                });
            }

            toast.error("Failed to load Data", {
                position: toast.POSITION.TOP_RIGHT,
            })

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE,
                payload: {
                    manualSearchData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const ManualSearchSubmitData_LoadMore_LoaderAction = () => {
    console.log("ManualSearchSubmitData_LoadMore_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: MANUAL_SEARCH_SUBMIT_LOAD_MORE_LOADER,
            payload: true,
        });
    }
}

export const ManualSearchSubmitDataByEngine_ClearAction = () => {
    console.log("ManualSearchSubmitDataByEngine_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_CLEAR,
        });
    }
}