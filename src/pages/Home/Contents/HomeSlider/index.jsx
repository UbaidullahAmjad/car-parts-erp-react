/* eslint-disable no-unused-vars */
import React from 'react'
import "./HomeSlider.css"
import Slider from "react-slick";
import SliderImage1 from "../../../../assets/img/slider_1.jpeg"
import SliderImage2 from "../../../../assets/img/slider_2.jpeg"
import SliderImage3 from "../../../../assets/img/slider_3.jpeg"

const HomeSlider = () => {

    const settings = {
        fade: true,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const sliderImages = [
        {
            image: SliderImage1,
        },
        {
            image: SliderImage2,
        },
        {
            image: SliderImage3,
        },
    ];

    return (
        <div className='home_slider-wrapper'>
            <Slider {...settings}>
                {
                    sliderImages && sliderImages.length > 0
                    && sliderImages.map((item) => (
                        <div className='slider_image_wrapper'>
                            <div className="slider_image_wrapper_overlay">
                                <img className='img-fluid' src={item.image} alt="" />
                            </div>
                            <img className='img-fluid' src={item.image} alt="" />
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default HomeSlider