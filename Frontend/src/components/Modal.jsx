import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Label from '../components/Label.jsx'
import Input from '../components/Input';

function Modal() {
  const [modal, setModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setModal(true)} className="text-[20px] text-blue-600 dark:text-blue-400" type="button">
        <FiEdit />
      </button>

      {modal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> Update </h3>
              <button
                onClick={() => setModal(false)} type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <IoMdClose className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4">
              <form className="space-y-4" action="#">
                <div>
                <Label htmlFor="userName" labelName="Name" />
                <Input type="text" name='name' />
                </div>
                <div>
                <Label htmlFor="EmailAddress" labelName="Email"/>
                <Input type="email" name='email' />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Modal;
