/* eslint-disable no-unused-vars */
import React from 'react'
import "./ModelDetailCardInfo.css"


const ModelDetailCardInfo = (props) => {
    const { car_info } = props;

    const title = car_info.title;
    const icon = car_info.icon;
    const model_info = car_info.model_info

    return (
        <div className='model_detail_card_info'>
            <div className="model_detail_card_info-header">
                <span className='icon_box'>{icon}</span>
                <p className='title'>{title}</p>
            </div>
            <div className="model_detail_card_info-body">
                {
                    model_info && model_info.length > 0
                    && model_info.map((item) => (
                        item.type && <>
                            <div className="model_details_info_detail_box">
                                <p className="detail_type">{item.type}</p>
                                <p className="detail_value">{item.value}</p>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default ModelDetailCardInfo