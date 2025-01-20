import { useState } from "react";
import { FaCartShopping, FaHeart, FaEye, } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { Link } from 'react-router-dom'

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

    
function BestSeller() {
  const[menuItem, setMenuItem] = useState(products);
  const [qty] = useState(1);
  const filterItems = (name) => {
    const newItems = products.filter((item) => item.name === name);
    setMenuItem(newItems); 
    if(name === 'all'){
      setMenuItem(products)
      return;
    }
  }

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
    <div className='mt-16 text-center bg-white'>
      <h1 className='font-bold text-4xl m-2 p-2 uppercase'>Best Seller</h1>
      <p className='mb-8 uppercase'>shop the new selection of new arrivals at out store. fill out your wishlist item </p>
      <div className=''>
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="bg-gray-200 px-6 py-2 mr-1 rounded-sm text-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => filterItems('all')}>All</button>
          <button className="bg-gray-200 px-6 py-2 mr-1 rounded-sm text-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => filterItems('DECOR')}>DECOR</button>
          <button className="bg-gray-200 px-6 py-2 mr-1 rounded-sm text-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => filterItems('KITCHEN')}>KITCHEN</button>
          <button className="bg-gray-200 px-6 py-2 mr-1 rounded-sm text-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => filterItems('LIVING ROOM')}>LIVING ROOM</button>
          <button className="bg-gray-200 px-6 py-2 mr-1 rounded-sm text-black font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => filterItems('SOFA')}>SOFA</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 m-10 overflow-hidden text-center relative">
        { menuItem?.map((val, ind) => (
          <div className="mx-auto max-w-[220px] relative" key={ind}>
              <div className="p-1 hover:bg-gray-200 hover:shadow transition-all duration-300 relative group">
                <img src={val.img} alt="prodImg" className="mx-auto " />
                <div className="icon absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ">
                  <div className="flex flex-wrap flex-col p-2 m-1 mt-1">
                    <FaCartShopping onClick={() => handleAddToCart(val)} size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                    <FaHeart size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                    <Link to={`/category/${val.name}`}>
                      <FaEye size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold uppercase">{val.name}</div>
                <div className="">{val.price}</div>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}
export default BestSeller;