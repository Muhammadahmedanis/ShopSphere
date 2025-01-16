import axios from 'axios';
import React, { useActionState, useEffect, useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import Modal from './Modal';
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Label from '../components/Label.jsx'
import Input from '../components/Input.jsx';
import { BsFillClockFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

function Table() {
    let token = JSON.parse(localStorage.getItem("token"));
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false);
    const[isOpen, setIsOpen] = useState(false);
    const [editUser, setEditUser] = useState({
        userName: "",
        email: "",
        _id: "",
    });
    const fetchData = async () => {
        const res = await axios.get("/api/v1/admin/getUsers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsers(res.data.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleDelete = async(id) => {
        console.log(id);
        try {
            const res = await axios.delete(`/api/v1/admin/deleteUser/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUsers(users.filter(item => item._id !== id));
            toast.success(response.data.message)
            console.log(response.data);
            
        } catch (error) {
            toast.error(error.response?.data.message)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Array of month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Extract day and month
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    }
    
    let Id;
    const handleEdit = async(id) => {
        Id = id;
        setModal(true);
        try {
            const res = await axios.get(`/api/v1/admin/editUser/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setEditUser({
                userName: res.data.data.userName || "",
                email: res.data.data.email || "",
                _id: res.data.data._id || ""
              });
        } catch (error) {
            toast.error(error.response?.data.message)
        }
    }


    const[user, submitAcion, isPending] = useActionState(async (previousState, formatDate) => {
        const userName = formatDate?.get("userName");
        const email = formatDate?.get("email");
        
        try {
            const response = await axios.put(`/api/v1/admin/updUser/${editUser._id}`, {userName, email});
            toast.success(response.data.message);
            fetchData();
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    })
      
    return (
<div className="relative shadow-md sm:rounded-lg">
  <div className="p-3  w-fit">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
        <IoSearch />
      </div>
      <input
        type="text"
        id="table-search"
        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search by name"
      />
    </div>
  </div>
  {/* Add overflow-x-auto to enable horizontal scrolling */}
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-3">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" className="px-4 py-3">ID</th>
          <th scope="col" className="px-4 py-3">Name</th>
          <th scope="col" className="px-4 py-3">Email</th>
          <th scope="col" className="px-4 py-3">Join</th>
          <th scope="col" className="px-4 py-3">Status</th>
          <th scope="col" className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-3">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <td className="p-3">{user._id}</td>
            <td className="p-3">{user.userName}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{formatDate(user.createdAt)}</td>
            <td className="p-3">
              {user.isVerified ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">Active</span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">Inactive</span>
              )}
            </td>
            <td className="px-6 py-4 flex gap-x-1 text-[19px]">
              <button onClick={() => handleDelete(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <IoTrashOutline />
              </button>
              <button onClick={() => handleEdit(user._id)} className="text-[20px] text-blue-600 dark:text-blue-400" type="button">
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
                        <form action={submitAcion} className="space-y-4">
                        <div>
                        <Label htmlFor="userName" labelName="Name" />
                        <input
                        className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="text"
                            name='userName'
                            onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })}
                            value={editUser.userName}
                            />
                        </div>
                        <div>
                        <Label htmlFor="EmailAddress" labelName="Email"/>
                        <input
                        className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            type="email"
                            name='email'
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            value={editUser.email}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white inline-flex justify-center gap-x-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                            { isPending && <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> }
                        </button>
                        </form>
                    </div>
                    </div>
                </div>
                )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    )
}

export default Table