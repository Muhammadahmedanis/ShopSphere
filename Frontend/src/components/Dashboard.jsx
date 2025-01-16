import React, { use } from 'react'
import { FiMoon } from "react-icons/fi";
import { IoHomeOutline  } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { ImStatsBars2 } from "react-icons/im";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { AuthContext } from "../context/authContext";
import axios from 'axios';
import Table from './Table';
import Cards from './Cards';
import Modal from './Modal';

function Dashboard() {
const { dispatch } = use(AuthContext);  
const handleLogout = async () => {
    try {
        await axios.post("/api/v1/auth/logout");
        toast.success("Logout successful");
        dispatch({type: "AUTH_LOGOUT"})
    } catch (error) {
        dispatch({type: "AUTH_LOGOUT", payload: error.response?.data.message})
        toast.error(error.response?.data.message)
    }
}

  return (
    <div className="flex h-screen bg-gray-200">
    {/* Sidebar */}
    <aside className="flex flex-col items-center w-16 h-full py-8 overflow-y-auto bg-gray-200 shadow-lg border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-6">
        <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="Logo" />
  
        <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <IoHomeOutline size={23} />
        </button>
  
        <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <ImStatsBars2 size={22} />
        </button>
  
        <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <HiOutlineUsers size={22} />
        </button>
  
        <button className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <FiMoon size={22} />
        </button>
      </nav>
  
      <div className="flex flex-col space-y-6">
        <button
          onClick={handleLogout}
          className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <RiLogoutCircleRLine size={22} />
        </button>
      </div>
    </aside>
  
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto">
      <div className="p-5">
        <Cards />
      </div>
      <div className="bg-gray-300 m-5 p-4 rounded-lg shadow">
        <Table />
      </div>
    </div>
  </div>  
  )
}

export default Dashboard