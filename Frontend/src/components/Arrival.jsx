import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaCartShopping, FaHeart, FaEye, } from "react-icons/fa6";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const products = [
  {
    id: 1,
    img: "/images/product/product1.jpg",
    name: "BEDROOM",
    price: "55.00",
  },
  {
    id: 2,
    img: "/images/product/product2.jpg",
    name: "OFFICE",
    price: "65.00",
  },
  {
    id: 3,
    img: "/images/product/product6.jpg",
    name: "LIGHTING",
    price: "85.00",
  },
  {
    id: 4,
    img: "/images/product/product5.jpg",
    name: "BATHROOM",
    price: "95.00",
  },
  {
    id: 5,
    img: "/images/product/product4.jpg",
    name: "KITCHEN",
    price: "35.00",
  },
  {
    id: 6,
    img: "/images/product/product3.jpg",
    name: "INTERIOR",
    price: "50.00",
  },
  {
    id: 7,
    img: "/images/product/product7.jpg",
    name: "LIVING ROOM",
    price: "100.00",
  },
  {
    id: 8,
    img: "/images/product/product8.jpg",
    name: "DECOR",
    price: "75.00",
  },
  {
    id: 9,
    img: "/images/product/product9.jpg",
    name: "LIVING ROOM",
    price: "45.00",
  },
  {
    id: 10,
    img: "/images/product/product10.jpg",
    name: "SOFA",
    price: "25.00",
  },
  {
    id: 11,
    img: "/images/product/product11.jpg",
    name: "LIVING ROOM",
    price: "150.00",
  },
  {
    id: 12,
    img: "/images/product/product12.jpg",
    name: "SOFA",
    price: "65.00",
  },
];

const NextArrow = ({ onClick }) => (
    <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] right-0 text-3xl cursor-pointer z-10 text-gray-600 hover:text-gray-800">
        <FaChevronRight />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div onClick={onClick} className="absolute top-[50%] translate-y-[-50%] left-0 text-3xl cursor-pointer z-10 text-gray-600 hover:text-gray-800">
        <FaChevronLeft />
    </div>
);

    
function Arrival() {
  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, // Adjust this based on the container size and number of items
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  const [qty] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    let totalPrice = qty * item.price;

    const tempProduct = {
      ...item,
      quantity: qty,
      totalPrice, 
    }
    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
  } 
  return (
    <div className='p-8 overflow-hidden text-center relative bg-gray-50 z-0'>
      <h1 className='font-bold text-4xl m-2 p-2 uppercase'>New Arrival</h1>
      <p className='mb-8 uppercase'>shop the new selection of new arrivals at out store. fill out your wishlist item </p>
      <div className=''>
        <Slider {...settings}>
        {
          products?.slice(2, 8).map((val, ind) => (
            <div className="mx-auto max-w-xs relative" key={ind}>
              <div className="p-1 hover:bg-gray-200 hover:shadow transition-all duration-300 relative group">
                <img src={val.img} alt="prodImg" className="mx-auto " />
                <div className="icon absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ">
                  <div className="flex flex-wrap flex-col p-2 m-1 mt-1">
                    <FaCartShopping onClick={() => handleAddToCart(val)} size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                    <FaHeart size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                    <FaEye size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold uppercase">{val.name}</div>
                <div className="">{val.price}</div>

              </div>
            </div>
          ))
        }
        </Slider>
      </div>
    </div>
  )
}

export default Arrival