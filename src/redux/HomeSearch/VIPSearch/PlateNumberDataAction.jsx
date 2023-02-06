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
import axios from "axios";
import { toast } from "react-toastify"
import { URL } from "../../../env";
import { TroubleshootTwoTone } from "@mui/icons-material";

export const GetPlateNumberData_Action = (plate_number, setError) => {
    console.log("GetPlateNumberData_Action called");

    /** plate_number="174-TU-8776" */
    console.log("GetPlateNumberData_Action props:", `plate_number=${plate_number}`);

    return async (dispatch) => {
        var plateNumberData = null;
        var enginesList = [];
        var pagination = null;
        var type = null;
        var sub_type = null;
        var model_id = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_chasis_number_react`, {
            params: {
                plate_number: plate_number,
            },
        }).then(async (response) => {
            console.log("GET_PLATE_NUMBER_DATA ------ ACTIONS -- Response", response);

            let plateNumber_Data = null;
            var error_msg = "";
            const data = response.data.data;
            if (data == 0 || data == 1 || data == 2 || data == 3) {
                isError = TroubleshootTwoTone;
                errorMessage = response.data?.message;
                error_msg = errorMessage + "";
                if (errorMessage) {
                    console.log("errorMessage_plate_number", errorMessage)
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    setError("plate_number", {
                        message: error_msg,
                    }, { shouldFocus: true });
                }

                    isError = true;
                    dispatch({
                        type: GET_PLATE_NUMBER_DATA,
                        payload: {
                            plateNumberData,
                            enginesList,
                            pagination,
                            type,
                            sub_type,
                            model_id,
                            loading,
                            isError,
                            errorMessage
                        }
                    })
            } else {
                plateNumber_Data = response.data.data;
                model_id = plateNumber_Data?.modelId;
                /** Get Engine Data */
                /** http://app.otospex.com/api/get_purchase_plate_engine_by_model_react?model_id=6732&page=1 */

                await axios.get(`${URL}/get_purchase_plate_engine_by_model_react`, {
                    params: {
                        model_id,
                        page: 1,
                    },
                }).then((resp) => {
                    console.log("GET_PLATE_NUMBER_DATA ------ ACTIONS -- engine_resp", resp);
                    enginesList = resp.data.engines;
                    pagination = resp.data?.pagination;
                    isError = false;

                    dispatch({
                        type: GET_PLATE_NUMBER_DATA,
                        payload: {
                            plateNumberData: plateNumber_Data,
                            enginesList,
                            pagination,
                            type: response.data?.type,
                            sub_type: response.data?.sub_type,
                            model_id,
                            loading,
                            isError,
                            errorMessage
                        }
                    });
                }).catch((err) => {
                    console.log("GET_PLATE_NUMBER_DATA ------ ACTIONS -- engine_resp-err", err.response);

                    isError = true;
                    errorMessage = err.response
                    dispatch({
                        type: GET_PLATE_NUMBER_DATA,
                        payload: {
                            plateNumberData,
                            enginesList,
                            pagination,
                            type,
                            sub_type,
                            model_id,
                            loading,
                            isError,
                            errorMessage
                        }
                    })
                })
            }
        }).catch((error) => {
            console.log("GET_PLATE_NUMBER_DATA ------ ACTIONS -- Response-Error", error);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_PLATE_NUMBER_DATA,
                payload: {
                    plateNumberData,
                    enginesList,
                    pagination,
                    type,
                    sub_type,
                    model_id,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const PlateNumberData_LoaderAction = () => {
    console.log("PlateNumberData_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: PLATE_NUMBER_DATA_LOADER,
            payload: true,
        });
    }
}

export const GetEngines_List_ByPlateNumber_LoadMore_Action = (page_no, modelId) => {
    console.log("GetEngines_List_ByPlateNumber_LoadMore_Action called");

    console.log("GetEngines_List_ByPlateNumber_LoadMore_Action props:", `page_no=${page_no} modelId=${modelId}`);

    return async (dispatch) => {
        var enginesList = [];
        var pagination = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_purchase_plate_engine_by_model_react`, {
            params: {
                page: page_no,
                model_id: modelId,
            },
        }).then((response) => {
            console.log("ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA ------ ACTIONS -- Response", response);

            enginesList = response.data.engines;
            pagination = response.data?.pagination;
            isError = false;
            dispatch({
                type: ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA,
                payload: {
                    enginesList,
                    pagination,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA,
                payload: {
                    enginesList,
                    pagination,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const PlateNumber_EnginesList_LoadMoreClickedAction = () => {
    console.log("PlateNumber_EnginesList_LoadMoreClickedAction called");
    return (dispatch) => {
        dispatch({
            type: ENGINES_LIST_BY_PLATE_NUMBER_MORE_DATA_LOADER,
            payload: true,
        });
    }
}

export const PlateNumber_EnginesList_ClearAction = () => {
    console.log("PlateNumber_EnginesList_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: ENGINES_LIST_BY_PLATE_NUMBER_DATA_CLEAR,
        });
    }
}

export const GetEngine_DetailedData_ByPlateNumberData_Action = (linkageTargetId) => {
    console.log("GetEngine_DetailedData_ByPlateNumberData_Action called");

    console.log("GetEngine_DetailedData_ByPlateNumberData_Action props:", `linkageTargetId (engine_id)=${linkageTargetId}`);

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
            console.log("ENGINE_DETAILED_DATA_BY_PLATE_NUMBER ------ ACTIONS -- Response", response);

            const engineData = response.data.data;
            isError = false;
            dispatch({
                type: ENGINE_DETAILED_DATA_BY_PLATE_NUMBER,
                payload: {
                    engineDetailedData: engineData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("ENGINE_DETAILED_DATA_BY_PLATE_NUMBER ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: ENGINE_DETAILED_DATA_BY_PLATE_NUMBER,
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

export const Engine_DetailedData_ByPlateNumberData_Clear_Action = () => {
    console.log("Engine_DetailedData_ByPlateNumberData_Clear_Action called");
    return (dispatch) => {
        dispatch({
            type: ENGINE_DETAILED_DATA_PLATE_NUMBER_CLEAR,
        });
    }
}

export const PlateNumberData_ClearAction = () => {
    console.log("PlateNumberData_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: PLATE_NUMBER_DATA_CLEAR,
        });
    }
}
