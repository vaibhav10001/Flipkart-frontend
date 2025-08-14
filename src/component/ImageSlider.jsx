import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
const ImageSlider = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ dynamic from .env
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        customPaging: () => (
            <div className="w-3 h-1 rounded-full bg-gray-300" />
        ),
        appendDots: (dots) => (
            <div className="flex justify-center space-x-2 mt-4">{dots}</div>
        ),
    };
    const arr = ["pic-1.png", "pic-2.png", "pic-3.png", "pic-4.png", "pic-5.png", "pic-6.png"]
    return (
        <div className='w-[97vw] shadow-md lg:h-[40vh] h-[13vh] m-[20px] bg-white rounded-[10px]'>
            <Slider {...settings}>
                {arr.map((image, index) => {
                    return (
                        <div key={index} className='w-fit'>
                            <img src={`./src/images/pic-1.png`} alt="image" className='object-contain' onClick={() => navigate("/")} />
                        </div>
                    )
                }
                )}
            </Slider>
        </div>
    )
}
export default ImageSlider
