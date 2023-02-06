/* eslint-disable no-unused-vars */
import {
    GET_ARTICLES_VIEW_DATA,
    ARTICLES_VIEW_DATA_CLEAR,
    ARTICLES_VIEW_DATA_LOADER,
} from "../../actionTypes"
import axios from "axios";
import { URL } from "../../../env";


/**
 *API: articles_view_react/
 
article_id: section_parts->legacyArticleId,
engine_id: car.carId,
section_id: section_id,

// type: car.carType,
 */

export const GetArticleViewData_Action = (article_id, engine_id, section_id, navigate) => {
    console.log("GetArticleViewData_Action called");

    console.log("GetArticleViewData_Action props:", `article_id=${article_id} engine_id=${engine_id} section_id=${section_id}`);

    return async (dispatch) => {
        var articlesData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        axios.get(`${URL}/articles_view_react`, {
            params: {
                article_id: article_id,
                engine_id: engine_id,
                section_id: section_id,
            }
        }).then((response) => {
            console.log("GET_ARTICLES_VIEW_DATA ------ ACTIONS -- Response", response);

            navigate("/searched-model-detail");

            articlesData = response.data;
            isError = false;
            dispatch({
                type: GET_ARTICLES_VIEW_DATA,
                payload: {
                    articlesData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_ARTICLES_VIEW_DATA ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_ARTICLES_VIEW_DATA,
                payload: {
                    articlesData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
}

export const ArticleViewData_LoaderAction = () => {
    console.log("ArticleViewData_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: ARTICLES_VIEW_DATA_CLEAR,
            payload: true,
        });
    }
}

export const ArticleViewData_ClearAction = () => {
    console.log("ArticleViewData_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: ARTICLES_VIEW_DATA_LOADER,
        });
    }
}
