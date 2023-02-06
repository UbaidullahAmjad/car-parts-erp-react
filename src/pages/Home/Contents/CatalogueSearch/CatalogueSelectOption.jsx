/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import "./CatalogueSelectOption.css"
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Input } from 'reactstrap';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import useOutsideDetector from "../../../../components/Hooks/useOutsideDetector"

const CatalogueSelectOption = (props) => {

    const [items, setItems] = useState(props.items || []);
    const [showItems, setShowItems] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items && items[0]);

    const wrapperItemRef = useRef(null);
    useOutsideDetector(wrapperItemRef, () => {
        setShowItems(false)
    });

    const dropDown = () => {
        setShowItems(!showItems)
    };

    const selectItem = item => {
        setSelectedItem(item)
        setShowItems(false)
    };

    return (
        <div ref={wrapperItemRef} className={`catalogue_select-box--box-wrapper ${props.className}`}>
            <div id="catalogue_select-box--box" className="catalogue_select-box--box">
                <div className="catalogue_select-box--container">
                    <div className="catalogue_select-box--selected-item">
                        {/* {selectedItem?.value || ""} */}
                        <Input type='text' placeholder={selectedItem?.value || ""} onClick={() => setShowItems(false)} />
                    </div>
                    <div className="catalogue_select-box--arrow" onClick={dropDown}>
                        <WidgetsOutlinedIcon className='catalogue_select-box--arrow-icon' />
                        {showItems
                            ? <ArrowDropUpIcon className="catalogue_select-box--arrow-up" />
                            : <ArrowDropDownIcon className="catalogue_select-box--arrow-down" />
                        }
                    </div>
                    <div
                        style={{ display: showItems ? "block" : "none" }}
                        className={"catalogue_select-box--items"}
                    >
                        {items && items.length > 0 && items.map((item) => (
                            <div
                                key={item.id}
                                id={"item_" + item.id}
                                onClick={() => selectItem(item)}
                                className={`catalogue_select-box--items_body ${selectedItem === item ? "selected" : ""}`}
                                onMouseEnter={() => {
                                    document.getElementById("item_" + item.id).classList.add("catalogue_select-box--items_body_hover")
                                }}
                                onMouseLeave={() => {
                                    document.getElementById("item_" + item.id).classList.remove("catalogue_select-box--items_body_hover")
                                }}
                            >
                                <span className='icon_box'>
                                    <item.icon className="icon" />
                                </span>
                                <span className='item_text'>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatalogueSelectOption