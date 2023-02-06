/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import "./ModelSectionSearchViewBox.css"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import CarDesign from "../../../../assets/img/car_design-1.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { ManualSearchSubmitDataByEngine_ClearAction } from "../../../../redux/HomeSearch/ManualSearchSubmitByEngine/ManualSearchSubmitByEngineAction"

const ModelSectionSearchViewBox = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uniqueData, logo, title, isFavourite, image, content } = props;

  const getManualSearch = useSelector((state) => state.getManualSearch);
  const manualSearchDataAllSections = getManualSearch.manualSearchData?.all_sections || [];
  console.log("getManualSearch-ModelSectionSearchViewBox: ", getManualSearch);
  // console.log("manualSearchDataAllSections: ", manualSearchDataAllSections);

  const getHomeModelsList = useSelector((state) => state.getHomeModelsList);
  const modelsList = getHomeModelsList.modelsList;

  useEffect(() => {
    if (modelsList.length == 0) {
      dispatch(ManualSearchSubmitDataByEngine_ClearAction())
    }
  }, [])

  return (
    <div className='model_section_search_view_box-wrapper'>
      {/* onClick={() => navigate("/searched-model-detail")} */}
      <div className="model_section_search_view_box-wrapper_inner">
        <div className="model_section_search_view_box-title_box">
          <div className="mdb_title-wrap">
            <div className="mdb_icon_box">
              {/* <HomeIcon /> */}
              {logo}
            </div>
            <p className='mdb_title'>{uniqueData?.gag?.masterDesignation || ""}</p>
          </div>
          <div className="mdb_favourite-wrap">
            {
              isFavourite ? <StarIcon /> : <StarBorderIcon />
            }
          </div>
        </div>
        <div className="model_section_search_view_box-body_box">
          {
            image && <div className="model_dasboard-image_box">
              <img src={image} alt="" />
            </div>
          }
          <div className="model_dasboard-content_box">
            <ul>
              {
                manualSearchDataAllSections.length > 0 && manualSearchDataAllSections.map((sect_item) => {
                  if (sect_item?.gag?.masterDesignation == uniqueData?.gag?.masterDesignation) {
                    return (
                      <li>
                        <span className='list_indicator'><ArrowRightIcon /></span>
                        {/* 
                        <Link to={`articles_search_view_react/:engine_id/:${sect_item?.section?.assemblyGroupNodeId}/:${sect_item?.ga?.articleId}`} className='model_dasboard_text'>{sect_item?.gag?.designation}</Link></li>
                         */}
                        <p
                          className='model_dasboard_text anchor'
                          onClick={() => navigate("/articles-list", {
                            state: {
                              engine_id: getManualSearch?.engine_id,
                              section_id: sect_item?.section?.assemblyGroupNodeId,
                              article_id: sect_item?.ga?.articleId,
                              type: getManualSearch?.linkageTargetType,
                            }
                          })}
                        >{sect_item?.gag?.designation}</p></li>
                    )
                  }
                })
              }
            </ul>
            {
              content && content != "" && typeof (content) != 'object' && (
                <p className="model_dasboard_text">{content}</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelSectionSearchViewBox