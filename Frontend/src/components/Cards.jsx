import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

function Cards() {
    const[income, setIncome] = useState([]);
    const[percen, setPercen] = useState(0);
    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await axios.get('/api/v1/order/income');
                setIncome(res.data.data);
                console.log(res.data.data);
                
                setPercen((res.data.data[0].total*100) / res.data.data[1].total - 100 )
            } catch (error) {
                console.log(error);
            }
        }
        getIncome();
    }, [])
    // console.log(income[0]?.total);
    // console.log(percen);
    
  return (
    <div className='flex flex-wrap'>
    <div className="sm:w-auto md:w-1/2 xl:w-1/3 px-6 py-3">
        <div className="bg-gradient-to-b w-56 md:w-auto from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-indigo-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600 sm:w-72">Total Orders</h2>
                   <p className="font-bold text-3xl">49 <span className="text-gray-600"><i className="fas fa-caret-up"></i></span></p>
                </div>
            </div>
        </div>
    </div>
    <div className="sm:w-auto md:w-1/2 xl:w-1/3 px-6 py-3">
        <div className="bg-gradient-to-b w-56 md:w-auto from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600 sm:w-72">Total Revenue</h2>
                    <div className='flex justify-center items-center gap-x-2'>
                        <p className="font-bold text-3xl">$ {income[0]?.total}<span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
                        <p className='flex items-center gap-x-1'>{Math.floor(percen)}% {percen > 0 ? <FaArrowUp className='text-green-500 font-bold' size={16}/>  : <FaArrowDown className='text-red-500 font-bold' size={16}/> } </p>
                    </div>
                        <p className='text-[13px] text-center font-semibold'>Compared to last month</p>
                </div>
            </div>
        </div>
    </div>
    <div className="sm:w-auto md:w-1/2 xl:w-1/3 px-6 py-3">
    <div className="bg-gradient-to-b w-56 md:w-auto from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
        <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
            </div>
            <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600  sm:w-72">Total Users</h2>
                <p className="font-bold text-3xl">249 <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></p>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default Cards