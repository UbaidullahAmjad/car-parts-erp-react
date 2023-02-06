/* eslint-disable no-unused-vars */
import React from 'react'
import { Row, Col, Card, CardBody, Button } from 'reactstrap'
import ModelSectionSearchViewBox from './Contents/ModelSectionSearchViewBox'
import "./SearchedModelBoard.css"
import Spinner from "react-bootstrap/Spinner";
import CarDesign from "../../assets/img/car_design-1.jpg"
import HomeIcon from '@mui/icons-material/Home';
import ModelSidebarBox from './Contents/ModelSidebarBox'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import { GetManualSearchSubmitDataByEngine_LoadMoreAction, ManualSearchSubmitData_LoadMore_LoaderAction } from "../../redux/HomeSearch/ManualSearchSubmitByEngine/ManualSearchSubmitByEngineAction"

const SearchedModelBoard = () => {

    const dispatch = useDispatch();
    const loaction = useLocation();
    // console.log("loaction-SearchedModelBoard", loaction)

    const getManualSearch = useSelector((state) => state.getManualSearch);
    const manualSearchData = getManualSearch.manualSearchData;
    console.log("getManualSearch-SearchedModelBoard: ", getManualSearch);

    const handleEnginesLoadmore = () => {
        // console.log("abababababab-engine_id",getManualSearch.engine_id)
        // console.log("abababababab-type",getManualSearch.type)
        // console.log("abababababab-sub_type",getManualSearch.sub_type)
        if (getManualSearch.loading == false) {
            dispatch(ManualSearchSubmitData_LoadMore_LoaderAction());
            dispatch(GetManualSearchSubmitDataByEngine_LoadMoreAction(getManualSearch.engine_id, getManualSearch.type, getManualSearch.sub_type));
        }
    }

    return (
        <div className='searched_model_board-wrapper'>
            <Row className="mt-4 mb-5">
                <Col className="ps-2 pe-2 pe-sm-1 mb-3" xs="12" sm="5" md="3" lg="3" xl="2">
                    <Card className="searched_model_board-sidebar rounded-0">
                        <CardBody className="px-2 py-2">
                            <ModelSidebarBox />
                        </CardBody>
                    </Card>
                </Col>
                <Col className="ps-2 pe-2 ps-sm-1 mb-3" xs="12" sm="7" md="9" lg="9" xl="10">
                    <Card className="searched_model_board-dashboard rounded-0">
                        <CardBody className="searched_model_board-dashboard_body px-2 py-2">
                            {
                                manualSearchData != null && manualSearchData.unique
                                    && manualSearchData.unique.length > 0
                                    ? manualSearchData.unique.map((item) => (
                                        <div className="dashboard_body-inner">
                                            <ModelSectionSearchViewBox
                                                uniqueData={item}
                                            />
                                        </div>
                                    )) : (
                                        <div className='py-3'>
                                            <h4>Sorry! No Engine Record Found</h4>
                                        </div>
                                    )
                            }
                            {/* {
                                SearchedModelBoard_Data.length > 0
                                && SearchedModelBoard_Data.map((item) => (
                                    <div className="dashboard_body-inner">
                                        <ModelDashboardBox
                                            logo={item.logo}
                                            title={item.title}
                                            isFavourite={item.isFavourite}
                                            image={item.image}
                                            content={item.content}
                                        />
                                    </div>
                                ))
                            } */}
                        </CardBody>
                        {
                            getManualSearch.loadMore && (
                                <CardBody className='pt-0 text-center'>
                                    <Button
                                        className='pt-1 pb-2 rounded-1'
                                        color='primary'
                                        onClick={handleEnginesLoadmore}
                                    >
                                        <span>Load More</span>
                                        {
                                            getManualSearch.loading && (
                                                <span className='btn_overlay'><Spinner /></span>
                                            )
                                        }
                                    </Button>
                                </CardBody>
                            )
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default SearchedModelBoard