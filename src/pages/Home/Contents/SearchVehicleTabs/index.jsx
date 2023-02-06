/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./SearchVehicleTabs.css"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchCarModelManual from './SearchCarModelManual';
import VIPSearch from './VIPSearch/VIPSearch';

const SearchVehicleTabs = (props) => {

    const { manuSubTypeValue } = props;

    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab != tab) {
            setActiveTab(tab)
        }
    }

    return (
        <div className='search_vehicle_tabs-wrapper'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab == '1' })}
                        onClick={() => { toggleTab('1'); }}
                    >
                        <span className="icon_box me-2"><ManageSearchIcon /></span>
                        <span className='title'>Manual Search</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab == '2' })}
                        onClick={() => { toggleTab('2'); }}
                    >
                        <span className="icon_box me-2"><TravelExploreIcon /></span>
                        <span className='title'>Vehicle Search</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='svt_tab_content' activeTab={activeTab}>
                <TabPane tabId="1">
                    <SearchCarModelManual manuSubTypeValue={manuSubTypeValue} />
                </TabPane>
                <TabPane tabId="2">
                    <VIPSearch manuSubTypeValue={manuSubTypeValue} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default SearchVehicleTabs