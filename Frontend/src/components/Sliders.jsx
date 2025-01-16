import React, { useRef } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Sliders() {

    const sliderData = [
        { img: "/images/slides/slide1.jpg"},
        { img: "/images/slides/slide2.jpg"},
        { img: "/images/slides/slide3.jpg"},

    ]

    const sliderRef = useRef();
    const next = () => {
        if(sliderRef.current){
            sliderRef.current.slickNext();
        }
    }
    const prev = () => {
        if(sliderRef.current){
            sliderRef.current.slickPrev();
        }
    }
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div className='overflow-hidden relative'>
        <Slider ref={sliderRef} {...settings}>
        {
            sliderData.map((val, ind) => (
                <div key={ind}>
                    <img className='w-full' src={val.img} alt="img" />
                </div>
            ))
        }
        </Slider>

        <RiArrowLeftSLine onClick={prev} className='bg-white absolute top-64 left-4 p-2 text-black font-bold size-8 hover:bg-red-500 hover:text-white '/>
        <RiArrowRightSLine onClick={next} className='bg-white absolute top-64 right-4 p-2 text-black font-bold size-8 hover:bg-red-500 hover:text-white ' />

    </div>
  )
}

export default Sliders;