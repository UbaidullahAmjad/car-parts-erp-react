/* eslint-disable no-unused-vars */
import React from 'react'
import "./CatalogueSearch.css"
import Widgets from '@mui/icons-material/Widgets';
import CalendarViewMonthSharpIcon from '@mui/icons-material/CalendarViewMonthSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BiotechIcon from '@mui/icons-material/Biotech';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CatalogueSelectOption from './CatalogueSelectOption'

const CatalogueSearch = (props) => {

    const catalogueItems = [
        { id: 1, icon: ManageSearchIcon, value: "Searched by groups (universal article)", },
        { id: 2, icon: BiotechIcon, value: "Search by any number", },
        { id: 3, icon: ContentPasteSearchIcon, value: "Search by article number", },
        { id: 4, icon: ManageSearchIcon, value: "Searc by comparable number", },
        { id: 5, icon: BiotechIcon, value: "Searc by trade number", }
    ];

    return (
        <div className={`catalogue_search_section ${props.className}`}>
            <CatalogueSelectOption items={catalogueItems} />
        </div>
    )
}

export default CatalogueSearch