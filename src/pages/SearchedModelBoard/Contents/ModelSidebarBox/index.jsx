/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./ModelSidebarBox.css"
import {
    UncontrolledAccordion,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
} from 'reactstrap';
import CarDesign from "../../../../assets/img/car_design-2.jpg"
import DummyCarDesign from "../../../../assets/img/image_demo_250.png"
import { useSelector } from 'react-redux';

const ModelSidebarBox = (props) => {

    const { enginePropsData } = props;

    const EngineImagePath = "/images/engines";

    const defaultOpen = [
        '1',
        '2',
    ];

    const getManualSearch = useSelector((state) => state.getManualSearch);
    const engineData = getManualSearch.manualSearchData?.engine || null;


    const VehicleDetails_Data = [
        {
            /* P = Passenger, A = Commercial */
            type: "Vehicle Type",
            // value: "Maruti Suzuki Baleno 1.2",
            value: enginePropsData ? enginePropsData?.linkageTargetType : engineData?.linkageTargetType == "P" ? "Passenger" : "Commercial",
        },
        {
            type: "Vehicle Name",
            value: enginePropsData ? enginePropsData?.mfrName : engineData?.mfrName || "",
        },
        {
            type: "Model Year",
            value: enginePropsData ? enginePropsData?.beginYearMonth : engineData?.beginYearMonth || "",
        },
        {
            type: "Performance",
            // value: "62 KW / 84 HP",
            value: enginePropsData ? enginePropsData?.description : engineData?.description || "",
        },
        {
            type: "Capacity (CC)",
            // value: "1197 cc/1.21",
            value: enginePropsData ? enginePropsData?.capacityCC : engineData?.capacityCC || "",
        },
        {
            type: "Liters Capacity",
            // value: "1197 cc/1.21",
            value: enginePropsData ? enginePropsData?.capacityLiters : engineData?.capacityLiters || "",
        },
        {
            type: "Cylinders",
            value: enginePropsData ? enginePropsData?.cylinders : engineData?.cylinders || "",
        },
        {
            type: "Valves",
            value: enginePropsData ? enginePropsData?.valves : engineData?.valves || "",
        },
        {
            type: "Body Style",
            value: enginePropsData?.bodyStyle ? enginePropsData?.bodyStyle : engineData?.bodyStyle || "",
        },
        {
            type: "Driver type",
            value: enginePropsData ? enginePropsData?.driveType : engineData?.driveType || "",
        },
        {
            type: "Engine Type",
            value: enginePropsData ? enginePropsData?.engineType : engineData?.engineType || "",
        },
        {
            type: "Engine codes",
            // value: "K12M",
            value: enginePropsData ? enginePropsData?.code : engineData?.code || "",
        },
        {
            type: "Fuel type",
            value: enginePropsData ? enginePropsData?.fuelType : engineData?.fuelType || "",
        },
        {
            type: "Fuel",
            // value: "Direct Injection",
            value: enginePropsData ? enginePropsData?.fuelMixtureFormationType : engineData?.fuelMixtureFormationType || "",
        },
    ];

    return (
        <div className='model_sidebar_box-wrapper'>
            <UncontrolledAccordion
                defaultOpen={defaultOpen}
                stayOpen
            >
                <AccordionItem className="select_vehicle_sidebar">
                    <AccordionHeader targetId="1">Select Vehicle</AccordionHeader>
                    <AccordionBody accordionId="1" className="select_vehicle_sidebar_body">
                        <div className="select_vehicle_sidebar_image_box">
                            <img
                                src={`${EngineImagePath}/${enginePropsData ? enginePropsData?.image : engineData?.image}`}
                                alt={enginePropsData ? enginePropsData?.image : engineData?.image}
                                onError={(event) => {
                                    event.target.src = DummyCarDesign;
                                    event.onerror = null; // prevents looping
                                }}
                            />
                        </div>
                        <div className="select_vehicle_sidebar_title_box">
                            <p className='select_vehicle_sidebar_title'>
                                {/* Maruti Suzuki Baleno 1.2 */}
                                {/* P = Passenger, A = Commercial */}
                                {enginePropsData ? enginePropsData?.mfrName : engineData?.mfrName || ""}
                                {" - "}
                                <span style={{ fontSize: 11 }}>{(enginePropsData ? enginePropsData?.linkageTargetType : engineData?.linkageTargetType) == "P" ? "Passenger" : "Commercial"}</span>
                            </p>
                        </div>
                        {/* <div className="select_vehicle_sidebar_cange_btns">
                            <Button className="btn_change" color="primary" outline>Change</Button>
                            <Button className="btn_delete" color="primary" outline>Delete</Button>
                        </div> */}
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem className="vehicle_details_sidebar">
                    <AccordionHeader targetId="2">Vehicle Details</AccordionHeader>
                    <AccordionBody accordionId="2" className="vehicle_details_sidebar_body">
                        {
                            VehicleDetails_Data && VehicleDetails_Data.length > 0
                            && VehicleDetails_Data.map((item) => (
                                <div className="vehicle_details_box">
                                    <p className="detail_type">{item.type}</p>
                                    <p className="detail_value">{item.value}</p>
                                </div>
                            ))
                        }
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
        </div>
    )
}

export default ModelSidebarBox