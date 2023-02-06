import {
    GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA,
    MANUAL_SEARCH_SUBMIT_LOADER,
    GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE,
    MANUAL_SEARCH_SUBMIT_LOAD_MORE_LOADER,
    MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_CLEAR,
} from "../../actionTypes"

const initialState = {
    manualSearchData: null,
    engine_id: null,
    type: null,
    sub_type: null,
    linkageTargetType: null,
    loadMore: false,
    loading: false,
    isError: false,
    errorMessage: null,
};

const ManualSearchByEngineReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA: {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA ------ REDUCERS --", payload);

            let searchedData = null;
            if (payload.isError == false && payload.manualSearchData != null) {
                const uniqueData = payload.manualSearchData?.unique
                const allSectionsData = payload.manualSearchData?.all_sections
                let uniqueArrRes = Object.keys(uniqueData).map((key) => [Number(key), uniqueData[key]]);
                let uniqueArrResFinal = uniqueArrRes.map((item) => item[1])

                searchedData = {
                    unique: uniqueArrResFinal,
                    all_sections: allSectionsData,
                    engine: payload.manualSearchData?.engine || null,
                }
                state.linkageTargetType = payload.manualSearchData?.engine?.linkageTargetType;
                state.loadMore = true;
            }

            return {
                ...state,
                manualSearchData: searchedData,
                engine_id: payload.engine_id,
                type: payload.type,
                sub_type: payload.sub_type,
                loadMore: state.loadMore,
                loading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case MANUAL_SEARCH_SUBMIT_LOADER: {
            console.log("MANUAL_SEARCH_SUBMIT_LOADER ------ REDUCERS --", payload);
            return {
                ...state,
                loading: payload,
            };
        }
        case GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE: {
            console.log("GET_MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_LOAD_MORE ------ REDUCERS --", payload);

            let searchedDataList = null;
            let searchedData = null;
            if (payload.isError == false && payload.manualSearchData != null) {
                const uniqueData = payload.manualSearchData?.unique;
                const allSectionsData_New = payload.manualSearchData?.all_sections; /** all_sections (new)  */

                let uniqueArrRes = Object.keys(uniqueData).map((key) => [Number(key), uniqueData[key]]);
                let uniqueArrResFinal = uniqueArrRes.map((item) => item[1]); /** unique (new)  */

                // console.log("searchedData_uniqueData_New", uniqueArrResFinal)
                // console.log("searchedData_allSectionsData_New", allSectionsData_New)

                let uniqueData_state = state.manualSearchData?.unique || [];
                let allSectionsData_state = state.manualSearchData?.all_sections || [];

                // console.log("searchedData_uniqueData_state", uniqueData_state)
                // console.log("searchedData_allSectionsData_state", allSectionsData_state)

                let mergedUniqueData = [...uniqueData_state, ...uniqueArrResFinal]
                let mergedAllSectionsData = [...allSectionsData_state, ...allSectionsData_New]

                // console.log("searchedData_mergedUniqueData", mergedUniqueData)
                // console.log("searchedData_mergedAllSectionsData", mergedAllSectionsData)

                const key = 'genericArticleId';
                let filteredUniqueData = [...new Map(mergedUniqueData.map(item => [item.gag[key], item])).values()];
                let filteredAllSectionsData = [...new Map(mergedAllSectionsData.map(item => [item.gag[key], item])).values()];

                // console.log("searchedData_filteredUniqueData", filteredUniqueData)
                // console.log("searchedData_filteredAllSectionsData", filteredAllSectionsData)

                // const names = ['James', 'John', 'Paul', 'Ringo', 'George', 'Ali'];
                // const names2 = [ 'John', 'George', 'Ali'];
                // const filteredNames = names.filter((itm) => itm !=  names2.find((item, index) => item == itm)) 

                searchedDataList = {
                    unique: filteredUniqueData,
                    all_sections: filteredAllSectionsData,
                    engine: payload.manualSearchData?.engine || state.manualSearchData?.engine || null,
                }
                state.loadMore = true;
            } else {
                searchedDataList = state.manualSearchData;
            }

            console.log("searchedData-searchedDataList-", searchedDataList)
            if (payload.manualSearchData == null || payload.manualSearchData == undefined) {
                if (payload.isError == false) {
                    state.loadMore = false;
                }
            }

            return {
                ...state,
                manualSearchData: searchedDataList,
                engine_id: state.engine_id,
                type: state.type,
                sub_type: state.sub_type,
                loadMore: state.loadMore,
                loading: false,
                isError: payload.isError,
                errorMessage: payload.errorMessage?.data || null,
            }
        }
        case MANUAL_SEARCH_SUBMIT_LOAD_MORE_LOADER: {
            return {
                ...state,
                loading: payload,
            }
        }
        case MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_CLEAR: {
            console.log("MANUAL_SEARCH_SUBMIT_BY_ENGINE_DATA_CLEAR ------ REDUCERS --");
            return initialState;
        }
        default:
            return state;
    }
}

export default ManualSearchByEngineReducer;