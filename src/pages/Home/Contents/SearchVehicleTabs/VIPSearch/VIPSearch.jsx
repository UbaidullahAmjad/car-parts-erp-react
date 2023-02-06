/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import "./VIPSearch.css"
import { Controller, useForm } from "react-hook-form";
import TypeaheadInfiniteScroll from '../../../../../components/TypeInputs/TypeAheadInfiniteScroll'
import { Card, CardBody, Col, Form, Row, Input, Label, Spinner, } from 'reactstrap';
import { Country, State, City } from "country-state-city";
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    GetPlateNumberData_Action,
    PlateNumberData_LoaderAction,
    GetEngines_List_ByPlateNumber_LoadMore_Action,
    PlateNumber_EnginesList_LoadMoreClickedAction,
    GetEngine_DetailedData_ByPlateNumberData_Action,
    Engine_DetailedData_ByPlateNumberData_Clear_Action,
    PlateNumber_EnginesList_ClearAction,
    PlateNumberData_ClearAction,
} from "../../../../../redux/HomeSearch/VIPSearch/PlateNumberDataAction"
import {
    GetManualSearchSubmitDataByEngineAction,
    ManualSearchSubmitData_LoaderAction,
    ManualSearchSubmitDataByEngine_ClearAction,
} from "../../../../../redux/HomeSearch/ManualSearchSubmitByEngine/ManualSearchSubmitByEngineAction"
import axios from 'axios';
import { URL } from '../../../../../env';

const VIPSearch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPlateNumberData = useSelector((state) => state.getPlateNumberData);
    const plateNumberData = getPlateNumberData.plateNumberData || null;
    const enginesList = getPlateNumberData.enginesList || [];
    const paginationEngines = getPlateNumberData.pagination;
    const loadMoreBtnLoadingEngines = getPlateNumberData.loadMoreBtnLoading;
    const engineDetailedData = getPlateNumberData.engineDetailedData;
    const [engine_Id, setEngine_Id] = useState(null);
    const [engineOnInputChangeValue, setEngineOnInputChangeValue] = useState("")
    let cancelEngineToken = null;
    const [engineSearcedData, setEngineSearcedData] = useState(null);
    console.log("getPlateNumberData", getPlateNumberData)

    const getManualSearch = useSelector((state) => state.getManualSearch);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        control: control2,
        setValue: setValue2,
        setError: setError2,
        formState: { errors: errors2 },
    } = useForm();

    const [pageLoad, setPageLoad] = useState(false)
    useEffect(() => {
        if (pageLoad == false) {
            // console.log("VIPSearch-useEffect called")
            dispatch(Engine_DetailedData_ByPlateNumberData_Clear_Action());
            dispatch(PlateNumberData_ClearAction())
            setEngine_Id(null);
        }
        setPageLoad(true)
    }, [])

    useEffect(() => {
        if (getPlateNumberData.model_id) {
            console.log("getEngineCustomSearchedData-engineOnInputChangeValue-useEffect:", engineOnInputChangeValue)
            const source = axios.CancelToken.source();
            cancelEngineToken = source;

            let engineRequest = null;
            if (engineOnInputChangeValue != "") {
                try {
                    engineRequest = axios.get(`${URL}/get_all_home_engines_react_search`, {
                        cancelToken: source.token,
                        params: {
                            name: engineOnInputChangeValue,
                            type: getPlateNumberData.type,
                            sub_type: getPlateNumberData.sub_type,
                            model_id: getPlateNumberData.model_id,
                        }
                    })
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log("Vehicle-Search-Engine-Request canceled");
                    } else {
                        // handle error
                    }
                }
            }

            engineRequest?.then((response) => {
                console.log("getEngineCustomSearchedData-response_then", response.data || null);
                if (engineSearcedData != null && engineOnInputChangeValue == "") {
                    setEngineSearcedData(null)
                    source.cancel();
                } else {
                    setEngineSearcedData(response ? response?.data : null)
                }
            })

            console.log("getEngineCustomSearchedData-response", engineRequest || null);

            if (engineSearcedData != null && engineOnInputChangeValue == "") {
                setEngineSearcedData(null)
            }

            return () => {
                if (cancelEngineToken) {
                    cancelEngineToken.cancel();
                }
                console.log("getEngineCustomSearchedData-engineSearcedData-useEffect", engineSearcedData)
            };
        }
    }, [engineOnInputChangeValue]);

    const handleEnginesOnChange = (value) => {
        setValue("engine", value);
        console.log("handleEnginesOnChange", value)

        if (value.length > 0) {
            let selectedEngineObj = [];
            selectedEngineObj = getPlateNumberData?.enginesList.find((item) => {
                // const engine = item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                // return engine?.includes(value);    
                return value[0]?.includes(item.description);
            });

            const enginelId = selectedEngineObj?.linkageTargetId;
            setEngine_Id(enginelId || null)

            console.log("selectedEngineObj", selectedEngineObj)

            dispatch(GetEngine_DetailedData_ByPlateNumberData_Action(enginelId));
        } else {
            dispatch(Engine_DetailedData_ByPlateNumberData_Clear_Action());
            setEngine_Id(null);
        }
    }

    const handleEnginesOnInputChange = (value) => {
        console.log("onInputChange", value)
        setEngineOnInputChangeValue(value)
    }

    const handleLoadMoreEngines = () => {
        console.log("handleLoadMore-paginationEngines", paginationEngines)
        if (paginationEngines?.has_next == true) {
            dispatch(PlateNumber_EnginesList_LoadMoreClickedAction())
            dispatch(GetEngines_List_ByPlateNumber_LoadMore_Action(paginationEngines.next_page, getPlateNumberData.model_id));
        }
    }

    const onSubmit = (data) => {
        console.log("onSubmit-VIPSearch", data)

        if (engineDetailedData?.linkageTargetId && getPlateNumberData?.type && getPlateNumberData?.sub_type) {
            dispatch(ManualSearchSubmitData_LoaderAction());
            dispatch(GetManualSearchSubmitDataByEngineAction(engineDetailedData?.linkageTargetId, getPlateNumberData?.type, getPlateNumberData?.sub_type, navigate))
        } else {
            toast.error("Engine ID is required", {
                position: toast.POSITION.TOP_RIGHT,
            })
        }
    }

    const onSubmit_2 = (data) => {
        if (getPlateNumberData.loading == false) {
            console.log("onSubmit_2", data)
            dispatch(PlateNumberData_LoaderAction())
            dispatch(GetPlateNumberData_Action(data.plate_number, setError2))
        }
    }

    return (
        <div className='vip_search-wrapper'>
            <Form onSubmit={handleSubmit2(onSubmit_2)}>
                <Row className='mb-3'>
                    <Col className='ps-2 pe-1' xs="9" sm="6" md="6">
                        {/* plate_number=174-TU-8776 */}
                        {/* <Label htmlFor="validationCustom02">
                            {"Plate Number"}
                            <span className="text-danger">*</span>
                        </Label> */}
                        <Controller
                            control={control2}
                            name="plate_number"
                            rules={{
                                required: true
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="plate_number"
                                    // value={""}
                                    placeholder={"156-TU-2999"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors2.plate_number?.type == "required" && "Plate Number is required"}
                            {errors2.plate_number?.message || ""}

                        </span>
                    </Col>
                    <Col className='ps-1 pe-2' xs="2" sm="3" md="2">
                        <Button variant='contained' type='submit' style={{ minWidth: 30 }}>
                            <SearchIcon />
                            {
                                getPlateNumberData.loading && (
                                    <span className='btn_overlay'><Spinner /></span>
                                )
                            }
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col className='px-2 pe-sm-1' xs="12" sm="6" md="6 mb-2">
                        {/* <Label htmlFor="validationCustom02">
                            {"Select Model"}
                            <span className="text-danger">*</span>
                        </Label> */}
                        <Controller
                            control={control}
                            name="model"
                            rules={{ required: false }}
                            defaultValue={plateNumberData != null ? plateNumberData.modelname : ""}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="model"
                                    value={plateNumberData != null ? plateNumberData.modelname : ""}
                                    disabled
                                    placeholder={"Model"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.model && "Model is required"}
                        </span>
                    </Col>
                    <Col className='px-2 ps-sm-1' xs="12" sm="6" md="6 mb-2">
                        {/* <Label htmlFor="validationCustom02">
                            {"Select Engine"}
                            <span className="text-danger">*</span>
                        </Label> */}
                        <Controller
                            control={control}
                            name="engine"
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field }) => (
                                <TypeaheadInfiniteScroll
                                    {...field}
                                    clearButton
                                    className="typehead_form_control"
                                    id="engine"
                                    // options_2={
                                    //     enginesList.length > 0
                                    //         ? enginesList.map((item) => (
                                    //             item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                                    //         ))
                                    //         : []
                                    // }
                                    options={
                                        engineSearcedData == null ? (
                                            enginesList.length > 0
                                                ? enginesList.map((item) => (
                                                    item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                                                ))
                                                : []
                                        ) : (
                                            engineSearcedData?.engines.length > 0
                                                ? engineSearcedData?.engines.map((item) => (
                                                    item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                                                ))
                                                : []
                                        )
                                    }
                                    // maxResults={engineSearcedData == null ? enginesList.length : (engineSearcedData?.manufacturers?.length || 0)}
                                    placeholder={"Select Engine"}
                                    onChange={handleEnginesOnChange}
                                    onInputChange={handleEnginesOnInputChange}
                                    onInputChangeValue={engineOnInputChangeValue}
                                    handleLoadMore={handleLoadMoreEngines}
                                    disableLoadMore={paginationEngines?.has_next ? paginationEngines.has_next == false : true}
                                    loadMoreLoading={
                                        loadMoreBtnLoadingEngines ? loadMoreBtnLoadingEngines : false
                                    }
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.engine && "Engine is required"}
                        </span>
                    </Col>
                    <Col className='px-2 pe-sm-1' xs="12" sm="6" md="6 mb-2">
                        {/* <Label htmlFor="validationCustom02">
                            {"Model Year"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="model_year"
                            rules={{ required: false }}
                            defaultValue={""}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="model_year"
                                    value={engineDetailedData ? engineDetailedData?.beginYearMonth : ""}
                                    disabled
                                    placeholder={"Model Year"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.model_year && "Model Year is required"}
                        </span>
                    </Col>
                    <Col className='px-2 ps-sm-1' xs="12" sm="6" md="6 mb-2">
                        {/* <Label htmlFor="validationCustom02">
                            {"Fuel"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="fuel"
                            rules={{ required: false }}
                            defaultValue={""}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="fuel"
                                    value={engineDetailedData ? engineDetailedData?.fuelType : ""}
                                    disabled
                                    placeholder={"Fuel"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.fuel && "Fuel is required"}
                        </span>
                    </Col>
                    <Col className='px-2 pe-sm-1' xs="12" sm="6" md="6 mb-2">
                        {/* <Label htmlFor="validationCustom02">
                            {"CC"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="cc"
                            rules={{ required: false }}
                            defaultValue={""}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="cc"
                                    value={engineDetailedData ? engineDetailedData?.capacityCC : ""}
                                    disabled
                                    placeholder={"CC"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.cc && "CC is required"}
                        </span>
                    </Col>
                    <Col className='px-2' md="12">
                        <Button variant='contained' type='submit'>
                            <SearchIcon />
                            <span>Search</span>
                            {
                                getManualSearch.loading && (
                                    <span className='btn_overlay'><Spinner /></span>
                                )
                            }
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default VIPSearch