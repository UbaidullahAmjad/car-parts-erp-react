/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, } from 'reactstrap'
import "./SearchedModelDetail.css"
import NfcIcon from '@mui/icons-material/Nfc';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ModeIcon from '@mui/icons-material/Mode';
import ModelDetailCardInfo from './ModelDetailCardInfo';
import CarLogo1 from "../../assets/img/car_logo_1.jpg"
import CarEngine1 from "../../assets/img/car_engine_1.jpg"
import CarEngine2 from "../../assets/img/car_engine_2.jpg"
import DummyLogo from "../../assets/img/image_demo.png"
import DummyImage1 from "../../assets/img/image_demo_250.png"
import DummyImage2 from "../../assets/img/image_demo_250.png"
import { useSelector } from 'react-redux';
import { ArticleViewData_ClearAction } from "../../redux/HomeSearch/ArticleView/ArticleViewAction"
import { useDispatch } from "react-redux"

const care_model_images = [
    {
        model_image: DummyImage1,
    },
];

const SearchedModelDetail = () => {

    const dispatch = useDispatch();
    const [modelCurrentImage, setModelCurrentImage] = useState(DummyImage1)

    const getArticleViewData = useSelector((state) => state.getArticleViewData)
    const articlesData = getArticleViewData.articlesData;
    console.log("articlesData", articlesData)
    console.log("getArticleViewData", getArticleViewData)

    const getManualSearch = useSelector((state) => state.getManualSearch);
    const manualSearchData = getManualSearch.manualSearchData;

    useEffect(() => {
        if (manualSearchData == null) {
            dispatch(ArticleViewData_ClearAction())
        }
    }, [])

    const ModelDetailCard_Info_Data = [
        {
            title: "General",
            icon: <NfcIcon />,
            model_info: [
                {
                    type: "Architecture number",
                    value: articlesData?.article?.articleNumber || "",
                },
                {
                    type: "GTIN/EAN",
                    value: articlesData?.article?.article_ean || "",
                },
                // {
                //     type: "Packing unit",
                //     value: "1",
                // },
                // {
                //     type: "Quantity per packing unit",
                //     value: "36",
                // },
            ],
        },
        {
            title: "Criteria",
            icon: <AutoFixNormalIcon />,
            model_info: [
                {
                    type: "Filter Type",
                    value: articlesData?.gag?.designation || "",
                },
                // {
                //     type: "Length",
                //     value: "356.6 mm",
                // },
                // {
                //     type: "Width",
                //     value: "171 mm",
                // },
                // {
                //     type: "Heigt",
                //     value: "25 mm",
                // },
            ],
        },
    ];

    return (
        <div className="searched_model_detail-wrapper mt-4 mb-5">
            <Card className='searched_model_detail-card'>
                <div className="searched_model_detail-header">
                    <p className='title'>{articlesData?.brand?.brandName}</p>
                </div>
                <div className="searched_model_detail-body">
                    <div className="searched_model_detail_top_card">
                        <div className="searched_model_detail_top_card-left_wrapper">
                            <div className="searched_model_detail_top_card-left">
                                <div className="smd_top_card_left-image_box">
                                    <img src={DummyLogo} alt="" />
                                </div>
                                <div className="smd_top_card_left-info">
                                    <p className="detail_type">Brand</p>
                                    <p className="detail_value">{articlesData?.brand?.brandName}</p>
                                </div>
                                <div className="smd_top_card_left-info">
                                    <p className="detail_type">Article number</p>
                                    <p className="detail_value">{articlesData?.article?.articleNumber}</p>
                                </div>
                                <div className="smd_top_card_left-info">
                                    <p className="detail_type">Product group</p>
                                    <p className="detail_value">{articlesData?.gag?.designation}</p>
                                </div>
                                <div className="smd_top_card_left-info">
                                    <p className="detail_type">Status</p>
                                    <p className="detail_value">{articlesData?.article?.articleStatusDescription}</p>
                                </div>
                                {/* <div className="smd_top_card_left-info">
                                    <p className="detail_type">SRS</p>
                                    <p className="detail_value">SRS</p>
                                </div> */}
                                {/* <div className="smd_top_card_left-info">
                                    <p className="detail_type">Price</p>
                                    <p className="detail_value">$ 14000</p>
                                </div> */}
                            </div>
                        </div>
                        <div className="searched_model_detail_top_card-right_wrapper">
                            <div className="searched_model_detail_top_card-right">
                                <div className="searched_model_detail_top_card_image_box_wrapper">
                                    <div className="searched_model_detail_top_card_image_box">
                                        <img src={modelCurrentImage} alt="" />
                                    </div>
                                </div>
                                <div className="searched_model_detail_top_card_other_images_box">
                                    {
                                        care_model_images && care_model_images.map((item) => (
                                            <div
                                                className={`searched_model_detail_top_card_other_image_body  ${modelCurrentImage == item.model_image ? "s_m_d_top_card_other_image_active" : ""}`}
                                                onClick={() => setModelCurrentImage(item.model_image)}
                                            >
                                                <img
                                                    src={item.model_image}
                                                    alt=""
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        {
                            ModelDetailCard_Info_Data && ModelDetailCard_Info_Data.length > 0
                            && ModelDetailCard_Info_Data.map((item, i) => (
                                <Col className={`mb-3 ${i % 2 == 0 ? "px-3 pe-sm-1" : "px-3 ps-sm-1"}`} xs="12" sm="6" md="6">
                                    <ModelDetailCardInfo car_info={item} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Card>
        </div>
    )
}

export default SearchedModelDetail