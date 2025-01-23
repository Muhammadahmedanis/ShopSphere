import { useEffect, useState } from "react";
import { FaCartShopping, FaHeart, FaEye, } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { Link } from 'react-router-dom'
import axios from "axios";
import { RiUserSearchLine } from "react-icons/ri";

function BestSeller({category, sort, filter}) {
  const[products, setProducts] = useState([]);
  const[filteredProduct, setFilteredProduct] = useState([]);
  // console.log(filter);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(category ? `/api/v1/product?category=${category}`: "/api/v1/product");
        // console.log(category);
        
        console.log(res.data.data);
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [category])

  useEffect(() => {
    if (category) {
      const hasFilters = Object.values(filter).some((value) => value.length > 0);
      setFilteredProduct(
        hasFilters
          ? products.filter((item) =>
              Object.entries(filter).every(([key, value]) =>
                Array.isArray(item[key])
                  ? value.some((val) => item[key].includes(val))
                  : item[key] === value
              )
            )
          : products
      );
    }
  }, [category, filter, products]);

  // console.log(filteredProduct)

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProduct(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    }else if(sort === "Low to High"){
      setFilteredProduct(prev => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProduct(prev => [...prev.sort((a, b) => b.price - a.price )]);
    }
  }, [sort])
      
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
    <div className='mt-16 text-center bg-white'>
      <h1 className='font-bold text-4xl m-2 p-2 uppercase'>Best Seller</h1>
      <p className='mb-8 uppercase'>shop the new selection of new arrivals at out store. fill out your wishlist item </p>
      <div className=''>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 m-10 overflow-hidden text-center relative">
        {
          category ? 
          (filteredProduct?.map((val, ind) => (
            <div key={ind} className="group overflow-hidden cursor-pointer relative">
              <div className="bg-gray-100 w-full overflow-hidden">
                <img src={val.img} alt="Product 1" className="object-cover object-top hover:scale-110 transition-all h-60 w-full duration-700"
                />
              </div>
              <div className="p-4 relative">
                <div
                  className="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10
                  transition-all duration-500
                  left-0 right-0
                  group-hover:bottom-20
                  lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
                  max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">
                  <Link to={`/product/${val._id}`}>
                        <FaEye size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                  </Link>
                  <FaCartShopping onClick={() => handleAddToCart(val)} size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                </div>
                <div className="z-20 relative bg-white">
                  <h6 className="text-sm font-semibold text-gray-800 truncate">
                    {val.title}
                  </h6>
                  <h6 className="text-sm text-gray-600 mt-2">${val.price}</h6>
                </div>
              </div>
            </div>
           )))
           : (products?.map((val, ind) => (
            <div className="group overflow-hidden cursor-pointer relative">
              <div className="bg-gray-100 w-full overflow-hidden">
                <img src={val.img} alt="Product 1" className="object-cover object-top hover:scale-110 transition-all h-60 w-full duration-700"
                />
              </div>
              <div className="p-4 relative">
                <div
                  className="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10
                  transition-all duration-500
                  left-0 right-0
                  group-hover:bottom-20
                  lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
                  max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">
                  <Link to={`/product/${val._id}`}>
                        <FaEye size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                  </Link>
                  <Link to={`/category/${val.categories[0]}`}>
                    <RiUserSearchLine size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                  </Link>
                </div>
                <div className="z-20 relative bg-white">
                  <h6 className="text-sm font-semibold text-gray-800 truncate">
                    {val.title}
                  </h6>
                  <h6 className="text-sm text-gray-600 mt-2">${val.price}</h6>
                </div>
              </div>
            </div>
           )))
        }
        
        </div>
      </div>
    </div>
  )
}
export default BestSeller;