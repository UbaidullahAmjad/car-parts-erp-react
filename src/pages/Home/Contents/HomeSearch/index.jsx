import React from 'react'
import SearchVehicleTabs from '../SearchVehicleTabs'
import "./HomeSearch.css"

const HomeSearch = (props) => {

    const { manuSubTypeValue } = props;

    return (
        <div className='home_search-wrapper'>
            <SearchVehicleTabs manuSubTypeValue={manuSubTypeValue} />
        </div>
    )
}

export default HomeSearch