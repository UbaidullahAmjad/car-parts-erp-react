/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import HomeManufacturersReducers from "./HomeSearch/HomeManufacturers/HomeManufacturersReducer"
import HomeModelsReducer from "./HomeSearch/HomeModels/HomeModelsReducer"
import HomeEnginesReducer from "./HomeSearch/HomeEngines/HomeEnginesReducer"
import ManualSearchReducer from "./HomeSearch/ManualSearchSubmitByEngine/ManualSearchSubmitByEngineReducer"
import ArticleDataReducer from "./HomeSearch/ArticleData/ArticleDataReducer"
import ArticleViewReducer from "./HomeSearch/ArticleView/ArticleViewReducer"
import PlateNumberDataReducer from "./HomeSearch/VIPSearch/PlateNumberDataReducer"
import BrandSearchReducer from "./HomeSearch/SearchByBrand/BrandSearch/BrandSearchReducer"
import ProductGroupSearchReducer from "./HomeSearch/SearchByBrand/ProductGroupSearch/ProductGroupSearchReducer"

const reducer = combineReducers({
  getHomeManufacturersList: HomeManufacturersReducers,
  getHomeModelsList: HomeModelsReducer,
  getHomeEngines: HomeEnginesReducer,
  getManualSearch: ManualSearchReducer,
  getArticleData: ArticleDataReducer,
  getArticleViewData: ArticleViewReducer,
  getPlateNumberData: PlateNumberDataReducer,
  getBrandSearchData: BrandSearchReducer,
  getProductGroupData: ProductGroupSearchReducer,
})

export default reducer;
