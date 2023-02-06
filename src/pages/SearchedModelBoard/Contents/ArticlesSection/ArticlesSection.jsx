/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./ArticlesSection.css"
import { Row, Col, Card, CardBody, Button, Spinner } from "reactstrap"
import VisibilityIcon from '@mui/icons-material/Visibility'
import ModelSidebarBox from '../ModelSidebarBox'
import ImageDemo from "../../../../assets/img/image_demo.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    GetArticleDataList_Action,
    ArticleDataList_LoaderAction,
    ArticleDataList_ClearAction,
    GetArticlesData_ByBrandSubmit_Action,
} from '../../../../redux/HomeSearch/ArticleData/ArticleDataAction'
import { GetArticleViewData_Action, ArticleViewData_LoaderAction, ArticleViewData_ClearAction } from "../../../../redux/HomeSearch/ArticleView/ArticleViewAction"
import ArticlesSectionButton from './ArticlesSectionButton'

const ArticlesSection = () => {
    const navigate = useNavigate();
    const locatoin = useLocation();
    const dispatch = useDispatch();
    console.log("locatoin", locatoin)

    let engineID = locatoin.state?.engine_id;
    let articleID = locatoin.state?.article_id;
    let sectionID = locatoin.state?.section_id;
    let linkageTargetType = locatoin.state?.type;

    let subSectionsId = locatoin.state?.sub_sections_id;

    const getArticleData = useSelector((state) => state.getArticleData);
    const articlesData = getArticleData.articlesData;
    const section_parts = articlesData?.section_parts || [];
    console.log("getArticleData", getArticleData)
    console.log("getArticleData-loading", getArticleData.loading)

    const getManualSearch = useSelector((state) => state.getManualSearch);
    const manualSearchData = getManualSearch.manualSearchData;
    console.log("manualSearchData-pppppppp", manualSearchData)

    const getProductGroupData = useSelector((state) => state.getProductGroupData);
    const productGroupList = getProductGroupData.productGroupList;
    console.log("productGroupList-pppppppp", productGroupList)

    useEffect(() => {
        // if (articlesData == null || articlesData.length == 0) {
        if (subSectionsId) {
            dispatch(ArticleDataList_LoaderAction())
            if (productGroupList == null || productGroupList.length == 0) {
                dispatch(ArticleDataList_ClearAction())
                dispatch(GetArticlesData_ByBrandSubmit_Action(null))
            } else {
                dispatch(GetArticlesData_ByBrandSubmit_Action(subSectionsId))
            }
        } else {
            dispatch(ArticleDataList_LoaderAction())
            if (manualSearchData == null) {
                dispatch(ArticleDataList_ClearAction())

                dispatch(GetArticleDataList_Action(null, null, null, null))
            } else {
                dispatch(GetArticleDataList_Action(engineID, articleID, sectionID, linkageTargetType))
            }
        }
        // }
    }, [])

    return (
        <div className='searched_model_board-wrapper'>
            <Row className="mt-4 mb-5">
                <Col className="ps-2 pe-2 pe-sm-1 mb-3" xs="12" sm="5" md="3" lg="3" xl="2">
                    <Card className="searched_model_board-sidebar rounded-0">
                        <CardBody className="px-2 py-2">
                            <ModelSidebarBox enginePropsData={subSectionsId ? articlesData?.car : null} />
                        </CardBody>
                    </Card>
                </Col>
                <Col className="ps-2 pe-2 ps-sm-1 mb-3" xs="12" sm="7" md="9" lg="9" xl="10">
                    <Card className="searched_model_board-dashboard rounded-0">
                        <CardBody className="searched_model_board-dashboard_body px-2 py-2">
                            <div className="articles_wrapper">
                                <div className="articles_header">
                                    <p className="arti_title arti_num">Article Number</p>
                                    <p className="arti_title arti_img">Image</p>
                                    <p className="arti_title arti_desc">Description</p>
                                    <p className="arti_title arti_action">Action</p>
                                </div>
                                {
                                    getArticleData.loading == true ? (
                                        <div className="article_body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h5 className='pb-0 pe-2'>Loading! Please wait</h5> <Spinner />
                                        </div>
                                    ) : (
                                        section_parts && section_parts.length > 0 ?
                                            section_parts.map((item) => (
                                                <div className="article_body">
                                                    <div className="arti_num">{item.articleNumber}</div>
                                                    <div className="arti_img">
                                                        <img className='article_image' src={ImageDemo} alt="" />
                                                    </div>
                                                    <div className="arti_desc">{articlesData?.gag?.designation || ""}</div>
                                                    <div className="arti_action">
                                                        <ArticlesSectionButton
                                                            color='primary'
                                                            article_id={item?.legacyArticleId}
                                                            engine_id={subSectionsId ? articlesData?.car?.linkageTargetId : articlesData?.car?.carId}
                                                            section_id={articlesData?.section_id}
                                                        />
                                                    </div>
                                                </div>
                                            )) : <>
                                                <div className="article_body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <p className='pb-0 mb-0'>No Section Record Found!!</p>
                                                </div>
                                            </>
                                    )
                                }
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ArticlesSection