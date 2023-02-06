/* eslint-disable no-unused-vars */
import {
    GET_ARTICLES_DATA_LIST,
    ARTICLES_DATA_LIST_CLEAR,
    ARTICLES_DATA_LIST_LOADER,
    GET_BRAND_SUBMIT_ARTICLES_DATA,
    BRAND_SUBMIT_ARTICLES_SUBMIT_LOADER,
    BRAND_SUBMIT_ARTICLES_DATA_CLEAR,
} from "../../actionTypes"

const initialState = {
    articlesData: null,
    loading: true,
    isError: false,
    errorMessage: null,
};

const ArticleDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ARTICLES_DATA_LIST: {
            console.log("GET_ARTICLES_DATA_LIST ------ REDUCERS --", payload);
            const all_articles = payload.articlesData || null;

            return {
                ...state,
                articlesData: all_articles,
                loading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ARTICLES_DATA_LIST_LOADER: {
            return {
                ...state,
                loading: payload,
            }
        }
        case GET_BRAND_SUBMIT_ARTICLES_DATA: {
            console.log("GET_BRAND_SUBMIT_ARTICLES_DATA ------ REDUCERS --", payload);

            const all_brands_articles = payload.articlesData || [];

            return {
                ...state,
                articlesData: all_brands_articles,
                loading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case BRAND_SUBMIT_ARTICLES_SUBMIT_LOADER: {
            console.log("BRAND_SUBMIT_ARTICLES_SUBMIT_LOADER ------ REDUCERS --", payload);
            return {
                ...state,
                loading: payload,
            };
        }
        case ARTICLES_DATA_LIST_CLEAR: {
            console.log("ENGINE_DETAILED_DATA_CLEAR ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default ArticleDataReducer;