/* eslint-disable no-unused-vars */
import {
    GET_ARTICLES_DATA_LIST,
    ARTICLES_DATA_LIST_CLEAR,
    ARTICLES_DATA_LIST_LOADER,
    GET_BRAND_SUBMIT_ARTICLES_DATA,
    BRAND_SUBMIT_ARTICLES_SUBMIT_LOADER,
    BRAND_SUBMIT_ARTICLES_DATA_CLEAR,
} from "../../actionTypes"
import axios from "axios";
import { URL, URL_Cors } from "../../../env";

export const GetArticleDataList_Action = (engine_id, article_id, section_id, type) => {
    console.log("GetArticleDataList_Action called");

    console.log("GetArticleDataList_Action props:", `engine_id=${engine_id} article_id=${article_id} section_id=${section_id}`);

    return async (dispatch) => {
        var articlesData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        axios({
            method: "post",
            url: `${URL}/articles_search_view_react`,
            data: {
                engine_id: engine_id,
                article_id: article_id,
                section_id: section_id,
                type: type,
            },
        }).then((response) => {
            console.log("GET_ARTICLES_DATA_LIST ------ ACTIONS -- Response", response);

            articlesData = response.data;
            isError = false;
            dispatch({
                type: GET_ARTICLES_DATA_LIST,
                payload: {
                    articlesData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_ARTICLES_DATA_LIST ------ ACTIONS -- Response-Error", error.response);

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_ARTICLES_DATA_LIST,
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

export const ArticleDataList_LoaderAction = () => {
    console.log("ArticleDataList_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: ARTICLES_DATA_LIST_LOADER,
            payload: true,
        });
    }
}

export const GetArticlesData_ByBrandSubmit_Action = (assemblyGroupNodeId) => {
    console.log("GetArticlesData_ByBrandSubmit_Action called");

    console.log("GetArticlesData_ByBrandSubmit_Action props:", `sub_section_id=${assemblyGroupNodeId}`);

    return async (dispatch) => {
        var articlesData = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/get_articles_by_brand_section_react`, {
            params: {
                sub_section_id: assemblyGroupNodeId,
            }
        }).then((response) => {
            console.log("GET_BRAND_SUBMIT_ARTICLES_DATA ------ ACTIONS -- Response", response);

            articlesData = response?.data || [];
            isError = false;

            dispatch({
                type: GET_BRAND_SUBMIT_ARTICLES_DATA,
                payload: {
                    articlesData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            console.log("GET_BRAND_SUBMIT_ARTICLES_DATA ------ ACTIONS -- Response-Error", error);

            const errorResponse = error.response?.data || null;

            isError = true;
            errorMessage = error.response
            dispatch({
                type: GET_BRAND_SUBMIT_ARTICLES_DATA,
                payload: {
                    articlesData,
                    loading,
                    isError,
                    errorMessage: errorResponse,
                }
            })
        })
    }
}

export const ArticlesDataSubmit_ByBrandSubmit_LoaderAction = () => {
    console.log("ArticlesDataSubmit_ByBrandSubmit_LoaderAction called");
    return (dispatch) => {
        dispatch({
            type: BRAND_SUBMIT_ARTICLES_SUBMIT_LOADER,
            payload: true,
        });
    }
}

export const ArticleDataList_ClearAction = () => {
    console.log("ArticleDataList_ClearAction called");
    return (dispatch) => {
        dispatch({
            type: ARTICLES_DATA_LIST_CLEAR,
        });
    }
}
