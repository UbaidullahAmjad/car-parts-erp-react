/* eslint-disable no-unused-vars */
import React, { useState, useEffect, } from 'react'
import "./SearchCarModelManual.css"
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Typography,
    Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Typeahead from '../../../../../components/TypeInputs/TypeAhead'
import TypeaheadInfiniteScroll from '../../../../../components/TypeInputs/TypeAheadInfiniteScroll'
import { Col, Form, Row, Label, Input } from 'reactstrap';
import { Country, State, City } from "country-state-city";
import { Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from "react-toastify"
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { URL } from '../../../../../env';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    GetHomeManufacturersListAction,
    HomeManufact_LoadMoreClickedAction,
    GetManufacturersSubType_Type_List_Action,
    HomeManufacturer_ClearAction,
} from '../../../../../redux/HomeSearch/HomeManufacturers/HomeManufacturersAction'
import {
    GetModels_List_ByMaufacturer_Action,
    Models_List_LoadMoreClickedAction,
    Models_List_ClearAction,
    GetModels_List_ByMaufacturer_Searched_Action,
} from '../../../../../redux/HomeSearch/HomeModels/HomeModelsAction'
import {
    GetEngines_List_ByMaufacturer_Action,
    Engines_List_LoadMoreClickedAction,
    Engines_List_ClearAction,
    GetEngine_DetailedData_ByHomeSearch_Action,
    Engine_DetailedData_Clear_Action,
    GetEngines_List_ByMaufacturer_Searched_Action,
} from '../../../../../redux/HomeSearch/HomeEngines/HomeEnginesAction';
import {
    GetManualSearchSubmitDataByEngineAction,
    ManualSearchSubmitData_LoaderAction,
    ManualSearchSubmitDataByEngine_ClearAction,
} from "../../../../../redux/HomeSearch/ManualSearchSubmitByEngine/ManualSearchSubmitByEngineAction"


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SearchCarModelManual = (props) => {
    const { manuSubTypeValue, } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getHomeManufacturersList = useSelector((state) => state.getHomeManufacturersList);
    const manufacturersList = getHomeManufacturersList.manufacturersList;
    const paginationManu = getHomeManufacturersList.pagination;
    const loadMoreBtnLoadingManu = getHomeManufacturersList.loadMoreBtnLoading;
    const [manufacturerId, setManufacturerId] = useState(null);
    const [manuOnInputChangeValue, setManuOnInputChangeValue] = useState("")

    console.log("getHomeManufacturersList:", getHomeManufacturersList);
    console.log("manufacturersList:", manufacturersList);

    const getHomeModelsList = useSelector((state) => state.getHomeModelsList);
    const modelsList = getHomeModelsList.modelsList;
    const paginationModels = getHomeModelsList.pagination;
    const loadMoreBtnLoadingModels = getHomeModelsList.loadMoreBtnLoading;
    const [model_Id, setModel_Id] = useState(null);
    const [modelOnInputChangeValue, setModelOnInputChangeValue] = useState("")

    console.log("getHomeModelsList:", getHomeModelsList);
    console.log("paginationModels:", paginationModels);

    const getHomeEngines = useSelector((state) => state.getHomeEngines);
    const enginesList = getHomeEngines.enginesList;
    const paginationEngines = getHomeEngines.pagination;
    const loadMoreBtnLoadingEngines = getHomeEngines.loadMoreBtnLoading;
    const engineDetailedData = getHomeEngines.engineDetailedData;
    const [engine_Id, setEngine_Id] = useState(null);
    const [engineOnInputChangeValue, setEngineOnInputChangeValue] = useState("")

    console.log("getHomeEnginesList:", enginesList);
    console.log("paginationEngines:", paginationEngines);

    const getManualSearch = useSelector((state) => state.getManualSearch);
    // console.log("getManualSearch:", getManualSearch);

    const [manufacturerSelectedData, setManufacturerSelectedData] = useState("");
    const [mainManuTypeValue, setMainManuTypeValue] = useState(manuSubTypeValue == 0 ? 0 : (manuSubTypeValue >= 4 ? 1 : 0));
    var currManuMainTypeKey = "P";
    var currentManuSubTypeKey = "home";

    console.log("mainManuTypeValue", mainManuTypeValue)
    console.log("manufacturerSelectedData", manufacturerSelectedData)

    let cancelManuToken = null;
    const [manuSearcedData, setManuSearcedData] = useState(null);
    let cancelModelToken = null;
    const [modelSearcedData, setModelSearcedData] = useState(null);
    let cancelEngineToken = null;
    const [engineSearcedData, setEngineSearcedData] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        resetField,
        formState: { errors },
    } = useForm();

    const [pageFirstLoad, setPageFirstLoad] = useState(true);
    useEffect(() => {
        getCurrenMainManuTypeKey();
        getCurrenManuSubTypeKey();
        setMainManuTypeValue(manuSubTypeValue == 0 ? mainManuTypeValue : (manuSubTypeValue >= 4 ? 1 : 0));

        console.log("manuSubTypeValue", manuSubTypeValue)

        console.log("type_key-currManuMainTypeKey", currManuMainTypeKey)
        console.log("type_key-currentManuSubTypeKey", currentManuSubTypeKey)

        // if (manuSubTypeValue > 0) {}
        if (pageFirstLoad == true) {
            if (getHomeManufacturersList.manufacturersList.length == 0) {
                dispatch(GetHomeManufacturersListAction(1));
            }
            console.log("first_page_load is true")
        } else {
            // setMainManuTypeValue(manuSubTypeValue == 0 ? mainManuTypeValue : (manuSubTypeValue >= 4 ? 1 : 0));
            console.log("first_page_load is false")
            if (getHomeManufacturersList.manufacturersList.length == 0) {
                dispatch(GetManufacturersSubType_Type_List_Action(1, currentManuSubTypeKey, currManuMainTypeKey));
            }
        }
        setPageFirstLoad(false)

        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")

        if (getHomeManufacturersList.manufacturersList.length == 0
            || manufacturerSelectedData == null
            || manufacturerSelectedData == "") {
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa_bbbbbbbbbbbbbbb")
            setManufacturerSelectedData([]);
            dispatch(Models_List_ClearAction());
            dispatch(Engines_List_ClearAction());
            dispatch(Engine_DetailedData_Clear_Action());

            setValue("model", "");
            setValue("engine", "");
            setManufacturerId(null);
            setModel_Id(null);
            setEngine_Id(null);
        }
        if (modelsList.length == 0) {
            dispatch(Engines_List_ClearAction());
            dispatch(Engine_DetailedData_Clear_Action());
        }
        if (enginesList.length == 0) {
            dispatch(Engine_DetailedData_Clear_Action());
        }

        // GetManufecturerData();
    }, [manuSubTypeValue, mainManuTypeValue])

    useEffect(() => {
        console.log("getManufecturerCustomSearchedData-manuOnInputChangeValue-useEffect:", manuOnInputChangeValue)
        const source = axios.CancelToken.source();
        cancelManuToken = source;

        let manuRequest = null;
        if (manuOnInputChangeValue != "") {
            try {
                manuRequest = axios.get(`${URL}/get_all_home_manufacturers_react_search`, {
                    cancelToken: source.token,
                    params: {
                        name: manuOnInputChangeValue,
                        type: currManuMainTypeKey,
                        sub_type: currentManuSubTypeKey,
                    }
                })
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("getManufecturerCustomSearchedData-Request canceled");
                }
            }
        }

        manuRequest?.then((response) => {
            console.log("getManufecturerCustomSearchedData-response_then", response.data || null);
            if (manuSearcedData != null && manuOnInputChangeValue == "") {
                setManuSearcedData(null)
                source.cancel();
            } else {
                setManuSearcedData(response ? response?.data : null)
            }
        })

        console.log("getManufecturerCustomSearchedData-response", manuRequest || null);

        if (manuSearcedData != null && manuOnInputChangeValue == "") {
            setManuSearcedData(null)
        } else {
            // getManufacturerChangeListnerData()
        }

        return () => {
            if (cancelManuToken) {
                cancelManuToken.cancel();
            }
            console.log("getManufecturerCustomSearchedData-manuSearcedData-useEffect", manuSearcedData)
        };
    }, [manuOnInputChangeValue]);

    useEffect(() => {
        console.log("getModelCustomSearchedData-modelOnInputChangeValue-useEffect:", modelOnInputChangeValue)
        const source = axios.CancelToken.source();
        cancelModelToken = source;

        let modelRequest = null;
        if (modelOnInputChangeValue != "") {
            try {
                modelRequest = axios.get(`${URL}/get_all_home_models_react_search`, {
                    cancelToken: source.token,
                    params: {
                        name: modelOnInputChangeValue,
                        type: currManuMainTypeKey,
                        sub_type: currentManuSubTypeKey,
                        manufacturer_id: manufacturerId,
                    }
                })
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("getModelCustomSearchedData-Request canceled");
                } else {
                    // handle error
                }
            }
        }

        modelRequest?.then((response) => {
            console.log("getModelCustomSearchedData-response_then", response.data || null);
            if (modelSearcedData != null && modelOnInputChangeValue == "") {
                setModelSearcedData(null)
                source.cancel();
            } else {
                setModelSearcedData(response ? response?.data : null)
            }
        })

        console.log("getModelCustomSearchedData-response", modelRequest || null);

        if (modelSearcedData != null && modelOnInputChangeValue == "") {
            setModelSearcedData(null)
        }

        return () => {
            if (cancelModelToken) {
                cancelModelToken.cancel();
            }
            console.log("getModelCustomSearchedData-modelSearcedData-useEffect", modelSearcedData)
        };
    }, [modelOnInputChangeValue]);

    useEffect(() => {
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
                        type: currManuMainTypeKey,
                        sub_type: currentManuSubTypeKey,
                        model_id: model_Id,
                    }
                })
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("getEngineCustomSearchedData-Request canceled");
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
    }, [engineOnInputChangeValue]);

    console.log("getManufecturerCustomSearchedData-manuSearcedData", manuSearcedData)
    console.log("getModelCustomSearchedData-modelSearcedData", modelSearcedData)
    console.log("getEngineCustomSearchedData-engineSearcedData", engineSearcedData)


    const GetManufecturerData = async () => {
        await axios.get(`${URL}/get_home_manufacturers_react`, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // },
            params: {
                page: 1,
                sub_type: currentManuSubTypeKey
            }
        }).then((response) => {
            console.log("GetManufecturerData-resp", response);
        }).catch((error) => {
            console.log("GetManufecturerData-resp-err", error.response);
        })
    }

    const getCurrenMainManuTypeKey = () => {
        console.log("mainManuTypeValueN---", mainManuTypeValue)
        if (mainManuTypeValue == 0) {
            // Pessenger (P)
            currManuMainTypeKey = "P";
        } else if (mainManuTypeValue == 1) {
            // Commercial Vehicle & Tractor (O)
            currManuMainTypeKey = "O";
        } else {
            // Pessenger (P)
            currManuMainTypeKey = "P";
        }
    }

    const getCurrenManuSubTypeKey = () => {
        if (manuSubTypeValue == 0) {
            // Home (home)
            currentManuSubTypeKey = "home";
        } else if (manuSubTypeValue == 1) {
            // PC (V)
            currentManuSubTypeKey = "V";
        } else if (manuSubTypeValue == 2) {
            // LCV (L)
            currentManuSubTypeKey = "L";
        } else if (manuSubTypeValue == 3) {
            // Motorcycle (B)
            currentManuSubTypeKey = "B";
        } else if (manuSubTypeValue == 4) {
            // CV (C)
            currentManuSubTypeKey = "C";
        } else if (manuSubTypeValue == 5) {
            // Tractor (T)
            currentManuSubTypeKey = "T";
        } else if (manuSubTypeValue == 6) {
            // Engine (M)
            currentManuSubTypeKey = "M";
        } else if (manuSubTypeValue == 7) {
            // Axels (A)
            currentManuSubTypeKey = "A";
        } else if (manuSubTypeValue == 8) {
            // CV Body Type (K)
            currentManuSubTypeKey = "K";
        } else {
            // Home (home)
            currentManuSubTypeKey = "home";
        }
    }

    const handleMainManuTypeChange = (event, newValue) => {
        if (mainManuTypeValue == 0) {
        }
        dispatch(HomeManufacturer_ClearAction());

        setMainManuTypeValue(newValue);
    };

    const handleManufacturerOnChange = (value) => {
        setValue("manufacturer", value);
        console.log("values-handleManufacturerOnChange", value)

        if (value.length > 0) {
            setManufacturerSelectedData(value[0])

            let selectedManuObj = [];
            if (manuSearcedData == null) {
                selectedManuObj = getHomeManufacturersList.manufacturersList.find((item) =>
                    item?.manuName?.toLowerCase() == value[0]?.toLowerCase()
                );
            } else {
                selectedManuObj = manuSearcedData?.manufacturers.find((item) =>
                    item?.manuName?.toLowerCase() == value[0]?.toLowerCase()
                );
            }

            const manuId = selectedManuObj?.manuId;
            setManufacturerId(manuId || null)

            console.log("selectedManuObj", selectedManuObj)

            if (manuSearcedData == null) {
                dispatch(GetModels_List_ByMaufacturer_Action(
                    1,
                    currManuMainTypeKey,
                    currentManuSubTypeKey,
                    manuId
                ));
            } else {
                dispatch(GetModels_List_ByMaufacturer_Searched_Action(
                    currManuMainTypeKey,
                    currentManuSubTypeKey,
                    manuId
                ));
            }
        } else {
            setManufacturerSelectedData([])
            dispatch(Models_List_ClearAction());
            dispatch(Engines_List_ClearAction());
            dispatch(Engine_DetailedData_Clear_Action());

            setValue("model", "");
            setValue("engine", "");
            setManufacturerId(null);
            setModel_Id(null);
            setEngine_Id(null);
        }

        console.log("type_values-mainManuTypeValue", mainManuTypeValue)
        console.log("type_values-manuSubTypeValue", manuSubTypeValue)
    }

    const handleManufacturerOnInputChange = (value) => {
        console.log("onInputChange", value)
        setManuOnInputChangeValue(value)
    }

    const handleModelsOnChange = (value) => {
        setValue("model", value);
        console.log("values-handleModelsOnChange", value)

        if (value.length > 0) {
            let selectedModelObj = [];
            if (modelSearcedData == null) {
                selectedModelObj = getHomeModelsList.modelsList.find((item) =>
                    item?.modelname?.toLowerCase() == value[0]?.toLowerCase()
                );
            } else {
                selectedModelObj = modelSearcedData?.models.find((item) =>
                    item?.modelname?.toLowerCase() == value[0]?.toLowerCase()
                );
            }

            const modelId = selectedModelObj?.modelId;
            setModel_Id(modelId || null)

            console.log("selectedModelObj", selectedModelObj)

            if (modelSearcedData == null) {
                dispatch(GetEngines_List_ByMaufacturer_Action(
                    1,
                    currManuMainTypeKey,
                    currentManuSubTypeKey,
                    modelId
                ));
            } else {
                dispatch(GetEngines_List_ByMaufacturer_Searched_Action(
                    currManuMainTypeKey,
                    currentManuSubTypeKey,
                    modelId
                ));
            }
        } else {
            dispatch(Engines_List_ClearAction());
            dispatch(Engine_DetailedData_Clear_Action());

            setValue("engine", "");
            setModel_Id(null);
            setEngine_Id(null);
        }
    }

    const handleModelsOnInputChange = (value) => {
        console.log("onInputChange", value)
        setModelOnInputChangeValue(value)
    }

    const handleEnginesOnChange = (value) => {
        setValue("engine", value);
        console.log("values-handleEnginesOnChange", value)

        if (value.length > 0) {
            let selectedEngineObj = [];
            if (engineSearcedData == null) {
                selectedEngineObj = getHomeEngines.enginesList.find((item) => {
                    // const engine = item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                    // return engine?.includes(value);    
                    return value[0]?.includes(item.description);
                });
            } else {
                selectedEngineObj = engineSearcedData?.engines.find((item) => {
                    // const engine = item.description + " (" + item.beginYearMonth + " / " + item.endYearMonth + ")"
                    // return engine?.includes(value);    
                    return value[0]?.includes(item.description);
                });
            }

            const enginelId = selectedEngineObj?.linkageTargetId;
            setEngine_Id(enginelId || null)

            console.log("selectedEngineObj", selectedEngineObj)

            dispatch(GetEngine_DetailedData_ByHomeSearch_Action(enginelId));
        } else {
            dispatch(Engine_DetailedData_Clear_Action());
            setEngine_Id(null);
        }
    }

    const handleEnginesOnInputChange = (value) => {
        console.log("onInputChange", value)
        setEngineOnInputChangeValue(value)
    }

    const handleLoadMoreManu = () => {
        console.log("handleLoadMore-paginationManu", paginationManu)
        if (paginationManu?.has_next == true) {
            dispatch(HomeManufact_LoadMoreClickedAction())
            dispatch(GetHomeManufacturersListAction(paginationManu.next_page));
        }
    }

    const handleLoadMoreModels = () => {
        console.log("handleLoadMore-paginationModels", paginationModels)
        if (paginationModels?.has_next == true) {
            dispatch(Models_List_LoadMoreClickedAction())
            dispatch(GetModels_List_ByMaufacturer_Action(
                paginationModels.next_page, currManuMainTypeKey, currentManuSubTypeKey, manufacturerId)
            );
        }
    }

    const handleLoadMoreEngines = () => {
        console.log("handleLoadMore-paginationEngines", paginationEngines)
        if (paginationEngines?.has_next == true) {
            dispatch(Engines_List_LoadMoreClickedAction())
            dispatch(GetEngines_List_ByMaufacturer_Action(
                paginationEngines.next_page, currManuMainTypeKey, currentManuSubTypeKey, model_Id)
            );
        }
    }

    // console.log("updatedCountries", updatedCountries)

    const onSubmit = (data) => {
        console.log("onSubmit-SearchCarModelManual", data)

        if (getManualSearch.loading == false) {

            getCurrenMainManuTypeKey();
            getCurrenManuSubTypeKey();

            const engine_id = engine_Id;
            const type = currManuMainTypeKey;
            const sub_type = currentManuSubTypeKey;

            console.log("onSubmit-SearchCarModelManual:", `engine_id(${engine_id}) type(${currManuMainTypeKey}) sub_type(${currentManuSubTypeKey})`)

            if (engine_id && type && sub_type) {
                dispatch(ManualSearchSubmitData_LoaderAction());
                dispatch(GetManualSearchSubmitDataByEngineAction(engine_id, type, sub_type, navigate))
            } else {
                toast.error("Engine ID is required", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
        }
    }


    return (
        <div className='search_carmodel-wrapper'>
            <div className="main_manu_types mb-2">
                <Tabs className='search_cm_tabs' value={mainManuTypeValue} onChange={handleMainManuTypeChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example"
                    TabIndicatorProps={{ style: { background: 'transparent', } }}>
                    <Tab className="cm_tab" icon={<DirectionsCarIcon />} iconPosition="start"
                        label="Passenger" {...a11yProps(0)} disabled={manuSubTypeValue > 0} />
                    <Tab className="cm_tab" icon={<DirectionsBusIcon />} iconPosition="start"
                        label="Commercial Vehicle & Tractor" {...a11yProps(1)} disabled={manuSubTypeValue > 0} />
                </Tabs>
                {/* <TabPanel value={mainManuTypeValue} index={0} className="p-0">
                    <span className='px-1'>Passenger</span>
                </TabPanel>
                <TabPanel value={mainManuTypeValue} index={1} className="p-0">
                    <span className='px-1'>Commercial Vehicle & Tractor</span>
                </TabPanel> */}
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mx-0'>
                    <Col className='px-0 pe-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
                        {/* <Label htmlFor="validationCustom02">
                            {"Select Manufacturer"}
                            <span className="text-danger">*</span>
                        </Label> */}
                        <Controller
                            control={control}
                            name="manufacturer"
                            // {...register("manufacturer")}
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field }) => (
                                <TypeaheadInfiniteScroll
                                    {...field}
                                    clearButton
                                    className="typehead_form_control"
                                    id="manufacturer"
                                    options={
                                        manuSearcedData == null ? (
                                            manufacturersList.length > 0
                                                ? manufacturersList.map((item) => item.manuName)
                                                : []
                                        ) : (
                                            manuSearcedData?.manufacturers.length > 0
                                                ? manuSearcedData?.manufacturers.map((item) => item.manuName)
                                                : []
                                        )
                                    }
                                    // maxResults={manuSearcedData == null ? manufacturersList.length : manuSearcedData?.manufacturers.length}
                                    placeholder={"Select Manufacturer"}
                                    onChange={handleManufacturerOnChange}
                                    onInputChange={handleManufacturerOnInputChange}
                                    onInputChangeValue={manuOnInputChangeValue}
                                    handleLoadMore={handleLoadMoreManu}
                                    disableLoadMore={paginationManu?.has_next ? paginationManu.has_next == false : true}
                                    loadMoreLoading={
                                        loadMoreBtnLoadingManu ? loadMoreBtnLoadingManu : false
                                    }
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.manufacturer && "Manufacturer is required"}
                        </span>
                    </Col>
                    <Col className='px-0 ps-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
                        {/* <Label htmlFor="validationCustom02">
                            {"Select Model"}
                            <span className="text-danger">*</span>
                        </Label> */}
                        <Controller
                            clearButton
                            control={control}
                            name="model"
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field }) => (
                                <TypeaheadInfiniteScroll
                                    {...field}
                                    clearButton
                                    ref={(ref) => control.log("typeaheadModelRef_2", ref)}
                                    className="typehead_form_control"
                                    id="model"
                                    options={
                                        modelSearcedData == null ? (
                                            modelsList.length > 0
                                                ? modelsList.map((item) => item.modelname)
                                                : []
                                        ) : (
                                            modelSearcedData?.models.length > 0
                                                ? modelSearcedData?.models.map((item) => item.modelname)
                                                : []
                                        )
                                    }
                                    // maxResults={modelSearcedData == null ? modelsList.length : manuSearcedData?.manufacturers.length}
                                    placeholder={"Select Model"}
                                    onChange={handleModelsOnChange}
                                    onInputChange={handleModelsOnInputChange}
                                    onInputChangeValue={modelOnInputChangeValue}
                                    handleLoadMore={handleLoadMoreModels}
                                    disableLoadMore={paginationModels?.has_next ? paginationModels.has_next == false : true}
                                    loadMoreLoading={
                                        loadMoreBtnLoadingModels ? loadMoreBtnLoadingModels : false
                                    }
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.model && "Model is required"}
                        </span>
                    </Col>
                    <Col className='px-0 pe-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
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
                                    maxResults={engineSearcedData == null ? enginesList.length : engineSearcedData?.manufacturers.length}
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
                    <Col className='px-0 ps-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
                        {/* <Label htmlFor="validationCustom02">
                            {"Model Year"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="model_year"
                            rules={{ required: false }}
                            render={() => (
                                <Input
                                    id="model_year"
                                    name="model_year"
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
                    <Col className='px-0 pe-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
                        {/* <Label htmlFor="validationCustom02">
                            {"Fuel"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="fuel"
                            rules={{ required: false }}
                            render={() => (
                                <Input
                                    id="fuel"
                                    name="fuel"
                                    value={engineDetailedData ? engineDetailedData?.fuelType : ""}
                                    disabled
                                    placeholder={"Fuel Type"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.fuel && "Fuel is required"}
                        </span>
                    </Col>
                    <Col className='px-0 ps-lg-1' xs="12" sm="12" md="12 mb-2" lg="6">
                        {/* <Label htmlFor="validationCustom02">
                            {"CC"}
                        </Label> */}
                        <Controller
                            control={control}
                            name="cc"
                            rules={{ required: false }}
                            render={() => (
                                <Input
                                    id="cc"
                                    name="cc"
                                    value={engineDetailedData ? engineDetailedData?.capacityCC : ""}
                                    disabled
                                    placeholder={"CC Capacity"}
                                />
                            )}
                        />
                        <span className='error text-danger'>
                            {errors.cc && "CC is required"}
                        </span>
                    </Col>
                    <Col className='px-0' md="12">
                        <Button variant='contained' type='submit' style={{ position: 'relative' }}>
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

export default SearchCarModelManual