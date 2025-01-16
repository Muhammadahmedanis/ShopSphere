import React, { use, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import useTheme from "../context/themeContext";
import { MdOutlineDashboard } from "react-icons/md";
import { toast } from 'react-toastify';

function Nvabar() {
  const [openModal, setOpenModal] = useState(false);
  const { user, dispatch  } = use(AuthContext);  
  const {theme, lightThemeMode, darkThemeMode } = useTheme()
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: 'Contact',
      slug: '/contact',
    },
  ]
  const [isOpen, setIsOpen] = useState(false);

  const handleTheme = () => {
    if(theme === "light") {
      darkThemeMode();
      console.log(theme);
    }else {
      lightThemeMode();
    }
  }  

  const handleLogout = async () => {
    try {
        await axios?.post("/api/v1/auth/logout");
        toast.success("Logout successful");
        dispatch({type: "AUTH_LOGOUT"})
    } catch (error) {
        dispatch({type: "AUTH_LOGOUT", payload: error.response?.data.message})
        toast.error(error.response?.data.message)
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://merakiui.com/images/full-logo.svg" className="h-7" />
    </a>
    <div className="flex items-center md:order-2 gap-x-3 md:space-x-0 flex-row-reverse">
          <button onClick={() => setOpenModal(!openModal)}
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-white"
            aria-haspopup="true">
            <span className="absolute -inset-1.5"></span>
            <div className="size-11 bg-gray-300 border-none font-bold text-[21px] flex items-center justify-center outline-none rounded-full">{user.user.slice(0, 1).toUpperCase()}</div>
          </button>
        <div className={`z-50 ${openModal ? 'block' : 'hidden'} my-4 top-3 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}>
             {/* Dropdown menu */}
             <div
            className={` ${openModal ? "block" : "hidden"} absolute right-1  top-14 z-10 mt-1 w-[132px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1">
            <button
            onClick={handleTheme}
              href="#"
              className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-1">
              Theme
              { theme === "light" ?  <IoSunnyOutline className="font-bold w-12" size={23} /> : <IoSunny size={23}/> }      
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2">
              Sign Out
              <RiLogoutCircleRLine className="font-bold w-9" size={19} />
            </button>
            {user.admin && <button
              className="flex flex-1 items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2">
               <Link to="/dashboard">Dashboard</Link>
              <MdOutlineDashboard className="font-bold w-9" size={19} />
            </button>}
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden dark:text-gray-400 dark:hover:bg-gray-700 ">
          <GiHamburgerMenu size={23} />
      </button>
    </div>
    <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1 `}>
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {
            navItems?.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  to={nav.slug}
                  className={({ isActive }) => `px-2.5 py-2 ${isActive && 'bg-red-400'} block text-gray-700 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2`}>
                  {nav.name}
                </NavLink>
              </li>
            ))
          }
      </ul>
    </div>
    </div>
  </nav>
  )
}

export default Nvabar