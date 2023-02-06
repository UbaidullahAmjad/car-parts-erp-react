/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import "./Home.css"
import { Col, Row } from 'reactstrap'
import HomeSlider from './Contents/HomeSlider'
import HomeSearch from './Contents/HomeSearch'
import SearchByBrand from './Contents/SearchByBrand/SearchByBrand'
import SearchCarModelTab from './SearchCarModelTab/SearchCarModelTab'
import CatalogueSearch from './Contents/CatalogueSearch/CatalogueSearch'
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from "react-redux"

const Home = () => {

    return (
        <div className='home-wrapper mt-4 mb-5'>
            <div className="top_nav_search_section">
                <div className="CatalogueSearch-box">
                    <p className='title'>Catalogue Search</p>
                    <CatalogueSearch className="CatalogueSearch-search" />
                </div>
                <div className='top_nav_menus_wrapper'>
                    <div className="top_nav_menus">
                        <PersonIcon />
                        <span className='nav_text'>Account</span>
                    </div>
                    <div className="top_nav_menus">
                        <ExitToAppIcon />
                        <span className='nav_text'>Logout</span>
                    </div>
                </div>
            </div>
            <SearchCarModelTab />
        </div>
    )
}

export default Home