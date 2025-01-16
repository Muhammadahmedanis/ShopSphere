import axios from 'axios';
import React, { useActionState, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { LuEye } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword = () => {
    const [passIcon, setPassIcon] = useState("password");
    const param = useParams();
    const token = param["token"]
    const [user, submitAction, isPending] = useActionState(async (previousState, formData) => {
        const newPassword = formData.get("newPassword");
        const confirmNewPassword = formData.get("confirmNewPassword");
        if (!newPassword || !confirmNewPassword) {
            return toast.error("Password is required")
        }
        if (newPassword !== confirmNewPassword) {
            return toast.error("Password donot match");
        }

        try {
            await axios.post(`/api/v1/auth/resetPass/${token}`, { newPassword, confirmNewPassword })
            toast.success("Password reset successful");
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    })

    const handlePass = () => {
        if (passIcon === "password") {
            setPassIcon("text");
        } else {
            setPassIcon("password")
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <main id="content" role="main" className="w-full max-w-md p-6">
                <div className="bg-white border shadow-lg mt-7 rounded-xl">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <div className="flex items-end justify-center mb-8 text-2xl font-bold">
                                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                            </div>
                            <h1 className="block text-lg font-bold text-gray-800">Reset Password</h1>
                        </div>
                        <div className="mt-5">
                            <form action={submitAction}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="new_password" className="block mb-2 ml-1 text-[17px] font-semibold">
                                            New password
                                        </label>
                                        <div className="relative flex items-center mt-2">
                                            <span onClick={handlePass} className="absolute right-1">
                                                {passIcon === "password" ? <FaRegEyeSlash className="w-5 h-5 mx-3 cursor-pointer font-bold text-gray-400 dark:text-gray-500" /> : <LuEye className="w-5 h-5 mx-3 cursor-pointer text-gray-400 dark:text-gray-500" />}
                                            </span>
                                            <input
                                                type={passIcon === "password" ? "password" : "text"}
                                                id="new_password"
                                                name="newPassword"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                                aria-describedby="new-password-error"
                                                placeholder="Enter a new password"
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="new-password-error">
                                            Please include a password that complies with the rules to ensure security
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirm_new_password" className="block mb-2 ml-1 text-[17px] font-semibold">
                                            Confirm new password
                                        </label>
                                        <div className="relative flex items-center mt-2">
                                            <span onClick={handlePass} className="absolute right-1">
                                                {passIcon === "password" ? <FaRegEyeSlash className="w-5 h-5 mx-3 cursor-pointer font-bold text-gray-400 dark:text-gray-500" /> : <LuEye className="w-5 h-5 mx-3 cursor-pointer text-gray-400 dark:text-gray-500" />}
                                            </span>
                                            <input
                                                type={passIcon === "password" ? "password" : "text"}
                                                id="confirm_new_password"
                                                name="confirmNewPassword"
                                                className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                                aria-describedby="confirm-new-password-error"
                                                placeholder="Confirm your new password"
                                            />
                                        </div>
                                        <p className="hidden mt-2 text-xs text-red-600" id="confirm-new-password-error">
                                            Please include a password that complies with the rules to ensure security
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Change my password
                                        {isPending && <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default ResetPassword;
