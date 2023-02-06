/* eslint-disable no-unused-vars */
import {
    GET_ENGINES_LIST_BY_HOME_MANUFACTURER,
    HOME_ENGINES_LOAD_MORE,
    ENGINES_LIST_BY_HOME_MANUFACTURER_CLEAR,
    ENGINE_DETAILED_DATA_BY_HOME_SEARCH,
    ENGINE_DETAILED_DATA_CLEAR,
    GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED,
} from "../../actionTypes"
import axios from "axios";
import { URL } from "../../../env";

export const GetEngines_List_ByMaufacturer_Action = (page_no, type, sub_type, modelId) => {
    console.log("GetEngines_List_ByMaufacturer_Action called");

    console.log("GetEngines_List_ByMaufacturer_Action props:", `page_no=${page_no} type=${type} sub_type=${sub_type} modelId=${modelId}`);

    return async (dispatch) => {
        var enginesList = [];
        var pagination = null;
        var mainType = "";
        var subType = "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        /** axios.get(`${URL_Cors}/get_home_manufacturers_react`) */
        await axios.get(`${URL}/get_engines_by_model_home_search_react`, {
            params: {
                page: page_no,
                type: type,
                sub_type: sub_type,
                model_id: modelId,
            }
        }).then((response) => {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER ------ ACTIONS -- Response", response);

            enginesList = response.data.engines;
            pagination = response.data.pagination;
            isError = false;
            dispatch({
                type: GET_ENGINES_LIST_BY_HOME_MANUFACTURER,
                payload: {
                    enginesList,
                    pagination,
                    mainType: type,
                    subType: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_ENGINES_LIST_BY_HOME_MANUFACTURER,
                payload: {
                    enginesList,
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

export const Engines_List_LoadMoreClickedAction = () => {
    console.log("Engines_List_LoadMoreClickedAction called");
    return (dispatch) => {
        dispatch({
            type: HOME_ENGINES_LOAD_MORE,
            payload: true,
        });
    }
}

export const Engines_List_ClearAction = () => {
    console.log("Engines_List_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: ENGINES_LIST_BY_HOME_MANUFACTURER_CLEAR,
        });
    }
}

export const GetEngines_List_ByMaufacturer_Searched_Action = (type, sub_type, modelId) => {
    console.log("GetEngines_List_ByMaufacturer_Searched_Action called");

    console.log("GetEngines_List_ByMaufacturer_Searched_Action props:", `type=${type} sub_type=${sub_type} modelId=${modelId}`);
 
    return async (dispatch) => {
        var enginesList = [];
        var pagination = null;
        var mainType = "";
        var subType = "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_all_home_engines_react_search`, {
            params: {
                name: "", /** to get all list  */
                type: type,
                sub_type: sub_type,
                model_id: modelId,
            }
        }).then((response) => {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ ACTIONS -- Response", response);

            enginesList = response.data.engines;
            isError = false;
            dispatch({
                type: GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED,
                payload: {
                    enginesList,
                    pagination,
                    mainType: type,
                    subType: sub_type,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_ENGINES_LIST_BY_HOME_MANUFACTURER_SEARCHED,
                payload: {
                    enginesList,
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


export const GetEngine_DetailedData_ByHomeSearch_Action = (linkageTargetId) => {
    console.log("GetEngine_DetailedData_ByHomeSearch_Action called");

    console.log("GetEngine_DetailedData_ByHomeSearch_Action props:", `linkageTargetId (engine_id)=${linkageTargetId}`);

    return async (dispatch) => {
        var engineDetailedData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_data_of_engine_home_search_react`, {
            params: {
                engine_id: linkageTargetId,
            }
        }).then((response) => {
            console.log("ENGINE_DETAILED_DATA_BY_HOME_SEARCH ------ ACTIONS -- Response", response);

            const engineData = response.data.data;
            isError = false;
            dispatch({
                type: ENGINE_DETAILED_DATA_BY_HOME_SEARCH,
                payload: {
                    engineDetailedData: engineData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("ENGINE_DETAILED_DATA_BY_HOME_SEARCH ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: ENGINE_DETAILED_DATA_BY_HOME_SEARCH,
                payload: {
                    engineDetailedData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const Engine_DetailedData_Clear_Action = () => {
    console.log("Engine_DetailedData_Clear_Action called");
    return (dispatch) => {
        dispatch({
            type: ENGINE_DETAILED_DATA_CLEAR,
        });
    }
}


