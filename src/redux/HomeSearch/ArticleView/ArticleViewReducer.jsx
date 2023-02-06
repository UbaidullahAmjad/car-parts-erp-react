/* eslint-disable no-unused-vars */
import {
    GET_ARTICLES_VIEW_DATA,
    ARTICLES_VIEW_DATA_CLEAR,
    ARTICLES_VIEW_DATA_LOADER,
} from "../../actionTypes"

const initialState = {
    articlesData: null,
    loading: true,
    isError: false,
    errorMessage: null,
};

const ArticleViewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ARTICLES_VIEW_DATA: {
            console.log("GET_ARTICLES_VIEW_DATA ------ REDUCERS --", payload);
            const all_articles = payload.articlesData || null;

            return {
                ...state,
                articlesData: all_articles,
                loading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ARTICLES_VIEW_DATA_CLEAR: {
            return {
                ...state,
                loading: payload,
            }
        }
        case ARTICLES_VIEW_DATA_LOADER: {
            console.log("ARTICLES_VIEW_DATA_LOADER ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default ArticleViewReducer;