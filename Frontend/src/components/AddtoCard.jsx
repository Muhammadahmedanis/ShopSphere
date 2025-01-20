import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartTotal, removeItem, updateQty } from '../redux/cartSlice';
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { data, Link } from 'react-router-dom';

function AddToCart() {
    const dispatch = useDispatch();
    const{data: cartProducts, totalAmount} = useSelector((state) => state.cart);
    // console.log(cartProducts);
    
    useEffect(() => {
        dispatch(getCartTotal())
    }, [useSelector(state => state.cart)])

    const handleRemove = (itemId) => {
        dispatch(removeItem({id: itemId}))
    };

    const increaseQty = (cartProductId, currentQty) => {
        const newQty = currentQty + 1;
        dispatch(updateQty({id: cartProductId, quantity: newQty}))
    };

    const decreaseQty = (cartProductId, currentQty) => {
        const newQty = Math.max(currentQty - 1, 1);
        dispatch(updateQty({id: cartProductId, quantity: newQty}))
    };

  return (
    <div className='bg-white p-4'>
        <div className='flex justify-center items-center pb-4 border-b-2'>
            <h1 className='text-xl font-semibold'>Shopping Cart</h1>
        </div>
        <div className='h-screen overflow-y-auto'>
            {
                cartProducts?.length === 0 ? ( <p className='font-bold text-xl text-center'>Your Cart is Empty</p> ) : (
                    <div className='bg-slate-200 '>
                    <ul className='text-center p-2'>
                        {
                            cartProducts.map((item, ind) => (
                            <div key={ind} className="grid grid-cols-3">
                            {/* Image Section */}
                            <div className="w-20 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                                <img
                                src="https://readymadeui.com/images/watch1.webp"
                                alt="Stylish Golden Watch"
                                className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="">
                                <h3 className="text-sm text-left sm:text-base font-bold text-gray-800">{item.title}</h3>
                                <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                Color:{" "}
                                { item.color.map((color, ind) => (
                                    <span key={ind} style={{ backgroundColor: color }} className="flex items-center w-4 h-4 rounded-full"></span>
                                )) 
                                }
                                </p>
                                <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                Size:{" "}
                                {item.size.map((size, ind) => (
                                    <span key={ind} className="flex items-center font-bold">{size+" :"}</span>
                                ))}
                                </p>
                                <div className="flex items-center mt-2">
                                <button
                                    onClick={() => decreaseQty(item.id, item.quantity)}
                                    className="rounded-full bg-black text-white font-light text-[14px] p-1 border">
                                    <TiMinus />
                                </button>
                                <span className="font-semibold text-xl px-2">{item.quantity || 1}</span>
                                <button
                                    onClick={() => increaseQty(item.id, item.quantity)}
                                    className="rounded-full bg-black text-white font-light text-[14px] p-1 border">
                                    <FaPlus />
                                </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <button
                                className="text-black text-xl p-1 hover:text-slate-600 cursor-pointer"
                                onClick={() => handleRemove(item.id)}
                                >
                                <IoCloseCircle size={27} />
                                </button>
                                {/* Price */}
                                <p className="font-bold text-lg mt-2">${item.price*item.quantity}</p>
                            </div>
                            </div>
                            ))
                        }
                    </ul>
                    </div>
                )
            }
        {
         cartProducts.length > 0 && 
         <Link to='/checkout'>
            <button className='flex bottom-1 bg-red-400 items-center mt-3 px-3 py-2 rounded-sm gap-x-1'>Checkout <FaArrowRight size={20}/> </button>
         </Link>
        }
        </div>
    </div>
  )
}

export default AddToCart