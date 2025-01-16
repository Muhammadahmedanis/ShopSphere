import React, { useEffect } from 'react'
import axios from 'axios'
import { LuMoveLeft } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';

function NotFound() {
    const params = useParams();
    useEffect(() => {
        const notFound = async () => {
            try {
                const response = await axios.get(`/api/${params["*"]}`);
                console.log(response);
                
            } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        };
        notFound();
    }, []);
    
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">The page {params["*"]} doesn't exist</p>
        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <LuMoveLeft size={20}/>
          <Link to="/">
            <span>Go back</span>
          </Link>
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NotFound