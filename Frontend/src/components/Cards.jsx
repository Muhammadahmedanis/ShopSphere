import React from 'react'

function Cards() {
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
                   <p className="font-bold text-3xl">$349 <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
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