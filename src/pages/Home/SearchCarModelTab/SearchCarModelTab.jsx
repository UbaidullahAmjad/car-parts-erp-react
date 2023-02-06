/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./SearchCarModelTab.css"
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Typography,
    Box,
} from "@mui/material";
import { Card, InputGroup, Input, Button, Form } from "reactstrap"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HeightIcon from '@mui/icons-material/Height';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeSearch from '../Contents/HomeSearch';
import SearchByBrand from '../Contents/SearchByBrand/SearchByBrand';
import HomeSlider from '../Contents/HomeSlider';
import CatalogueSearch from '../Contents/CatalogueSearch/CatalogueSearch';
import { useDispatch } from 'react-redux';
import { HomeManufacturer_ClearAction } from "../../../redux/HomeSearch/HomeManufacturers/HomeManufacturersAction"

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


const SearchCarModelTab = () => {

    const dispatch = useDispatch();
    const [manuSubTypeValue, setManuSubTypeValue] = useState(0);

    const handleManuSubTypeChange = (event, newValue) => {
        dispatch(HomeManufacturer_ClearAction())
        setManuSubTypeValue(newValue);
    };

    return (
        <div className='search-carmodel-tabs'>
            <Card className='search_cm_card rounded-0 border-0 px-0' sx={{ width: '100%' }}>
                <Box className='cm_tabs_box' sx={{ borderBottom: 0, }}>
                    <Tabs className='search_cm_tabs' value={manuSubTypeValue} onChange={handleManuSubTypeChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example"
                        TabIndicatorProps={{ style: { background: 'transparent', } }}>
                        <Tab className="cm_tab" icon={<HomeIcon />} iconPosition="start" label="Home" {...a11yProps(0)} />
                        <Tab className="cm_tab" icon={<DirectionsCarIcon />} iconPosition="start" label="PC" {...a11yProps(1)} />
                        <Tab className="cm_tab" icon={<LocalShippingIcon />} iconPosition="start" label="LCV" {...a11yProps(2)} />
                        <Tab className="cm_tab" icon={<TwoWheelerIcon />} iconPosition="start" label="Motorcycle" {...a11yProps(3)} />
                        <Tab className="cm_tab" icon={<DirectionsBusIcon />} iconPosition="start" label="CV" {...a11yProps(4)} />
                        <Tab className="cm_tab" icon={<AgricultureIcon />} iconPosition="start" label="Tractor" {...a11yProps(5)} />
                        <Tab className="cm_tab" icon={<SettingsSuggestIcon />} iconPosition="start" label="Engine" {...a11yProps(6)} />
                        <Tab className="cm_tab" icon={<HeightIcon style={{ transform: 'rotate(90deg)' }} />} iconPosition="start" label="Axels" {...a11yProps(7)} />
                        <Tab className="cm_tab" icon={<AirportShuttleIcon />} iconPosition="start" label="CV Body Type" {...a11yProps(8)} />
                    </Tabs>
                </Box>
                <div className='home_inner_top'>
                    <div className="home_search_section">
                        <div className="smart_search_section mb-3">
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <InputGroup>
                                    <Button>
                                        <SearchIcon />
                                        Smart Search
                                    </Button>
                                    <Input type='text' placeholder='Start typing...' />
                                </InputGroup>
                            </Form>
                        </div>
                        {/* <TabPanel value={manuSubTypeValue} index={0} className="p-0">
                                <span className='px-1'>Home</span>
                            </TabPanel>
                         */}
                        <HomeSearch manuSubTypeValue={manuSubTypeValue} />
                        <SearchByBrand />
                    </div>
                    <div className="home_slider_section">
                        <HomeSlider />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default SearchCarModelTab