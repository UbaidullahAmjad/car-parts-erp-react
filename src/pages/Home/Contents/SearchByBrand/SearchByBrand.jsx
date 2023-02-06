/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import "./SearchByBrand.css"
import { Controller, useForm } from "react-hook-form";
import TypeAheadInfiniteScroll from '../../../../components/TypeInputs/TypeAheadInfiniteScroll';
import { Card, Col, Form, Row, Label, CardBody } from 'reactstrap';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../../../../env';
import axios from 'axios';
import {
    GetBrandSearchDataAction,
    BrandSearchData_LoadMore_LoaderAction,
    BrandSearchData_ClearAction,
} from "../../../../redux/HomeSearch/SearchByBrand/BrandSearch/BrandSearchAction"
import {
    GetProductGroupSearchDataAction,
    GetProductGroupSearch_LoadMoreData_Action,
    ProductGroupSearchData_LoadMore_LoaderAction,
    ProductGroupSearchData_ClearAction,
} from "../../../../redux/HomeSearch/SearchByBrand/ProductGroupSearch/ProductGroupSearchAction"
import { toast } from 'react-toastify';

const SearchByBrand = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const getBrandSearchData = useSelector((state) => state.getBrandSearchData);
    const brandDataList = getBrandSearchData.brandDataList;
    const paginationBrand = getBrandSearchData.pagination;
    const loadMoreBtnLoadingBrand = getBrandSearchData.loadMoreBtnLoading;
    const [brandId, setBrandId] = useState(null);
    const [brandOnInputChangeValue, setBrandOnInputChangeValue] = useState("")
    let cancelBrandToken = null;
    const [brandSearchedData, setBrandSearchedData] = useState(null);

    console.log("getBrandSearchData", getBrandSearchData)

    const getProductGroupData = useSelector((state) => state.getProductGroupData);
    const productGroupList = getProductGroupData.productGroupList;
    const loadMoreBtnProductGroup = getProductGroupData.loadMoreBtn;
    const loadMoreBtnLoadingProductGroup = getProductGroupData.loadMoreBtnLoading;
    const [productGroupId, setProductGroupId] = useState(null);
    const [productGroupOnInputChangeValue, setProductGroupOnInputChangeValue] = useState("")
    let cancelProductGroupToken = null;
    const [productGroupSearchedData, setProductGroupSearchedData] = useState(null);

    console.log("getProductGroupData", getProductGroupData);

    useEffect(() => {
        if (brandDataList && brandDataList.length == 0) {
            dispatch(GetBrandSearchDataAction(1));
        }
        console.log("brandId", brandId)
        if (brandId == null) {
            dispatch(ProductGroupSearchData_ClearAction())
        }
    }, []);

    useEffect(() => {
        console.log("getBrandCustomSearchedData-brandOnInputChangeValue-useEffect:", brandOnInputChangeValue)
        const source = axios.CancelToken.source();
        cancelBrandToken = source;

        let brandRequest = null;
        if (brandOnInputChangeValue != "") {
            try {
                brandRequest = axios.get(`${URL}/get_all_home_brands_react_search`, {
                    cancelToken: source.token,
                    params: {
                        name: brandOnInputChangeValue,
                    }
                })
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("getBrandCustomSearchedData-Request canceled");
                }
            }
        }

        brandRequest?.then((response) => {
            console.log("getBrandCustomSearchedData-response_then", response.data || null);
            if (brandSearchedData != null && brandOnInputChangeValue == "") {
                setBrandSearchedData(null)
                source.cancel();
            } else {
                setBrandSearchedData(response ? response?.data : null)
            }
        })

        console.log("getBrandCustomSearchedData-response", brandRequest || null);

        if (brandSearchedData != null && brandOnInputChangeValue == "") {
            setBrandSearchedData(null)
        }

        return () => {
            if (cancelBrandToken) {
                cancelBrandToken.cancel();
            }
            console.log("getBrandCustomSearchedData-brandSearchedData-useEffect", brandSearchedData)
        };
    }, [brandOnInputChangeValue]);

    useEffect(() => {
        // console.log("getProductGroupCustomSearchedData-productGroupOnInputChangeValue-useEffect:", productGroupOnInputChangeValue)
        // const source = axios.CancelToken.source();
        // cancelProductGroupToken = source;

        // let productGroupRequest = null;
        // if (productGroupOnInputChangeValue != "") {
        //     try {
        //         productGroupRequest = axios.get(`${URL}/get_all_home_sections_by_brands_react_search`, {
        //             cancelToken: source.token,
        //             params: {
        //                 name: productGroupOnInputChangeValue,
        //                 brand_id: brandId,
        //             }
        //         })
        //     } catch (error) {
        //         if (axios.isCancel(error)) {
        //             console.log("getProductGroupCustomSearchedData-Request canceled");
        //         }
        //     }
        // }

        // productGroupRequest?.then((response) => {
        //     console.log("getProductGroupCustomSearchedData-response_then", response.data || null);
        //     if (productGroupSearchedData != null && productGroupOnInputChangeValue == "") {
        //         setProductGroupSearchedData(null)
        //         source.cancel();
        //     } else {
        //         setProductGroupSearchedData(response ? response?.data : null)
        //     }
        // })

        // console.log("getProductGroupCustomSearchedData-response", productGroupRequest || null);

        // if (productGroupSearchedData != null && productGroupOnInputChangeValue == "") {
        //     setProductGroupSearchedData(null)
        // }

        // return () => {
        //     if (cancelProductGroupToken) {
        //         cancelProductGroupToken.cancel();
        //     }
        //     console.log("getProductGroupCustomSearchedData-productGroupSearchedData-useEffect", productGroupSearchedData)
        // };
    }, [productGroupOnInputChangeValue]);

    const handleBrandOnChange = (value) => {
        setValue("brand", value);
        if (value.length > 0) {
            let selectedBrandObj = [];
            selectedBrandObj = brandDataList.find((item) =>
                item?.brandName?.toLowerCase() == value[0]?.toLowerCase()
            );

            const brand_Id = selectedBrandObj?.brandId;
            setBrandId(brand_Id || null)

            console.log("selectedBrandObj", selectedBrandObj)

            if (brand_Id) {
                dispatch(GetProductGroupSearchDataAction(brand_Id))
            }
        } else {
            setBrandId(null)
            dispatch(ProductGroupSearchData_ClearAction())
        }
    }

    const handleBrandsOnInputChange = (value) => {
        console.log("onInputChange", value)
        setBrandOnInputChangeValue(value)
    }

    const handleLoadMoreBrand = () => {
        console.log("handleLoadMore-handleLoadMoreBrand", paginationBrand)
        if (paginationBrand?.has_next == true) {
            dispatch(BrandSearchData_LoadMore_LoaderAction())
            dispatch(GetBrandSearchDataAction(paginationBrand?.next_page));
        }
    }

    const handleProductGroupOnChange = (value) => {
        setValue("product_group", value);
    }

    const handleProductGroupsOnInputChange = (value) => {
        console.log("onInputChange", value)
        setProductGroupOnInputChangeValue(value)
    }

    const handleLoadMoreProductGroup = () => {
        console.log("handleLoadMore-handleLoadMoreProductGroup", loadMoreBtnProductGroup)
        if (brandId) {
            if (loadMoreBtnProductGroup == true) {
                dispatch(ProductGroupSearchData_LoadMore_LoaderAction());
                dispatch(GetProductGroupSearch_LoadMoreData_Action(getProductGroupData?.sectionCount, brandId))
            }
        } else {
            toast.error("No Brand Id selected", {
                position: toast.POSITION.TOP_RIGHT,
            })
        }
    }

    const onSubmit = (data) => {
        console.log("onSubmit-Data", data)

        // const product_group = 
        let selectedProductGroupObj = [];
        selectedProductGroupObj = productGroupList.find((item) =>
            data.product_group[0]?.toLowerCase()?.includes(item?.articleNumber?.toLowerCase())
        );

        const assemblyGroupNodeId = selectedProductGroupObj?.assemblyGroupNodeId;

        console.log("onSubmit-selectedProductGroupObj", selectedProductGroupObj)

        if (assemblyGroupNodeId) {
            navigate("/articles-list", {
                state: {
                    sub_sections_id: assemblyGroupNodeId,
                }
            })
        } else {
            toast.error("Assembly Group NodeId not found", {
                position: toast.POSITION.TOP_RIGHT,
            })
        }
    }

    return (
        <div className='search_by_brand-wrapper'>
            <Card className='mt-3 rounded-0 border-0' sx={{ width: '100%' }}>
                <Box className='d-flex align-items-center px-3' sx={{ borderBottom: 0, }}
                    style={{ color: 'var(--primary-color)', minHeight: 40 }}>
                    <h5 className='mb-0' style={{ fontWeight: 700, fontSize: 18 }}>Search By Brand</h5>
                </Box>
                <CardBody className='pt-1 px-2'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col className='px-2 pe-sm-1' xs="12" sm="6" md="6 mb-3">
                                {/* <Label htmlFor="validationCustom02">
                                    {"Select Brand"}
                                    <span className="text-danger">*</span>
                                </Label> */}
                                <Controller
                                    control={control}
                                    name="brand"
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TypeAheadInfiniteScroll
                                            {...field}
                                            clearButton
                                            className="typehead_form_control"
                                            id="brand"
                                            // options={
                                            //     brandSearchedData == null ? (
                                            //         brandDataList.length > 0
                                            //             ? brandDataList.map((item) => item?.brandName)
                                            //             : []
                                            //     ) : (
                                            //         brandSearchedData?.brands?.length > 0
                                            //             ? brandSearchedData?.brands.map((item) => item.brandName)
                                            //             : []
                                            //     )
                                            // }
                                            options={
                                                brandDataList.length > 0
                                                    ? brandDataList.map((item) => item?.brandName)
                                                    : []
                                            }
                                            // maxResults={brandSearchedData == null ? brandDataList?.length : brandSearchedData?.brands?.length}
                                            placeholder={"Select Brand"}
                                            onChange={handleBrandOnChange}
                                            onInputChange={handleBrandsOnInputChange}
                                            onInputChangeValue={brandOnInputChangeValue}
                                            handleLoadMore={handleLoadMoreBrand}
                                            disableLoadMore={paginationBrand?.has_next ? paginationBrand.has_next == false : true}
                                            loadMoreLoading={
                                                loadMoreBtnLoadingBrand ? loadMoreBtnLoadingBrand : false
                                            }
                                        />
                                    )}
                                />
                                <span className='error text-danger'>
                                    {errors.brand && "Brand is required"}
                                </span>
                            </Col>
                            <Col className='px-2 ps-sm-1' xs="12" sm="6" md="6 mb-3">
                                {/* <Label htmlFor="validationCustom02">
                                    {"Select Product Group"}
                                    <span className="text-danger">*</span>
                                </Label> */}
                                <Controller
                                    control={control}
                                    name="product_group"
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TypeAheadInfiniteScroll
                                            {...field}
                                            clearButton
                                            className="typehead_form_control"
                                            id="product_group"
                                            options={
                                                productGroupList.length > 0
                                                    ? productGroupList.map((item) => (
                                                        item?.assemblyGroupName + " - " + item?.articleNumber
                                                    ))
                                                    : []
                                            }
                                            // maxResults={productGroupList?.length}
                                            placeholder={"Select Product Group"}
                                            onChange={handleProductGroupOnChange}
                                            onInputChange={handleProductGroupsOnInputChange}
                                            onInputChangeValue={productGroupOnInputChangeValue}
                                            handleLoadMore={handleLoadMoreProductGroup}
                                            disableLoadMore={loadMoreBtnProductGroup == true ? false : true}
                                            loadMoreLoading={
                                                loadMoreBtnLoadingProductGroup ? loadMoreBtnLoadingProductGroup : false
                                            }
                                        />
                                    )}
                                />
                                <span className='error text-danger'>
                                    {errors.product_group && "Product Group is required"}
                                </span>
                            </Col>
                            <Col md="12">
                                <Button variant='contained' type='submit'>
                                    <SearchIcon />
                                    <span>Search</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SearchByBrand