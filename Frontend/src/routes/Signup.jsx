import React, { useActionState, use, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaRegEyeSlash } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Input from '../components/Input';
import Label from '../components/Label';
import { getData } from './Otp.jsx';

function Signup() {
  const navigate = useNavigate();
  const { dispatch } = use(AuthContext)
  const[passIcon, setPassIcon] = useState("password");
  const [formState, submitAction, isPending] = useActionState(async (previousState, formData) => {
    // const errors = {};
    const userName = formData.get("userName");
    const email = formData.get("email");
    const password = formData.get("password");

    // Field Validations
    if (!userName) toast.error("Username is required");
    if (!email) {
      toast.error("email required")
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format")
    }
    if (!password) {
      toast.error("Password is required")
    } else if (password.length < 7) {
      toast.error("Password must be at least 8 characters")
    }

    // If there are errors, return them to prevent form reset
    // if (Object.keys(errors).length > 0) {
    //   return { ...previousState, errors };
    // }

    // API Call
  const data = { userName, email, password };
  if (data.userName.length && data.email.length && data.password.length) {
    try {
        const response = await axios.post("/api/v1/auth/signup", data);
        localStorage.setItem("token", JSON.stringify(response.data.token))
        const userInfo = {user: userName ,admin: response?.data.data?.isAdmin};
        getData({email:  response?.data.data?.email, _id:  response?.data.data?._id});
        dispatch({type: "AUTH_SUCCESS", payload: userInfo});
        console.log(userInfo);
        toast.success(response.data.message);
        navigate("/otp")
        // return { ...previousState, errors: null }; // Clear errors on success
      } catch (error) {
        toast.error(error.response?.data.message);
        dispatch({type: "AUTH_FAIL", payload: error.response?.data.message})
        // return { ...previousState, errors: error.message };
      }
    }
});

  const handlePass = () => {
  if (passIcon === "password") {
    setPassIcon("text");
  }else{
    setPassIcon("password")
  }
 }
  // const { errors } = formState || {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
          }}
        >
        </div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>

          <button className="flex w-full items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
              <FcGoogle size={30} />
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign up with Google
            </span>
          </button>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form action={submitAction}>
            <div className='my-4'>
            <Label htmlFor="LoggingUsername" labelName="Username" />
              <div className="relative flex items-center mt-2">
                <span className="absolute right-1">
                  <FaRegUser className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500" />
                </span>
                <Input type="text" name="userName" placeholder="abc"  />
              </div>
                {/* {errors?.userName && <p className="error text-red-700">{errors.userName}</p>} */}
            </div>

            <div className='my-4'>
              <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
              <div className="relative flex items-center mt-2">
                <span className="absolute right-1">
                  <FaRegEnvelope className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500" />
                </span>
                <Input type="email" name="email" placeholder="abc@gmail.com" />
              </div>
                {/* {errors?.email && <p className="error text-red-700">{errors.email}</p>} */}
            </div>

            <div className='my-2'>
              <Label htmlFor="LoggingPassword" labelName="Password" />
              <div className="relative flex items-center mt-2">
               <span onClick={handlePass} className="absolute right-1">
                  {passIcon === "password" ? <FaRegEyeSlash className="w-5 h-5 mx-3 cursor-pointer font-bold text-gray-400 dark:text-gray-500" /> : <LuEye className="w-5 h-5 mx-3 cursor-pointer text-gray-400 dark:text-gray-500" />}
                </span>
                <Input type={passIcon === "password" ? "password" : "text" } name="password" placeholder="••••••••" />
              </div>
              {/* {errors?.password && <p className="error text-red-700">{errors.password}</p>} */}
            </div>
            <button
            disabled={isPending}
              type='submit'
              className="mt-6 w-full inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-lg bg-indigo-500 hover:bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10  focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
                <div className='text-[17px]'> Sign Up </div>
              { isPending && <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> }   
            </button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link to='/signin'>
              <div className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"> or sign in </div>
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup