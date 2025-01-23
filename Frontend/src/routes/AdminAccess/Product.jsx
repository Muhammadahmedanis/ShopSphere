import axios from 'axios';
import React, { useActionState, useEffect, useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.jsx';
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Label from '../../components/Label.jsx'
import Input from '../../components/Input.jsx';
import { BsFillClockFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../helper/useFetch.js';
import { deleteProduct } from '../../helper/useDelete.js';
import { FaImage } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { editProduct } from '../../helper/useEdit.js';
// const[isOpen, setIsOpen] = useState(false);

function Product() {
    const [modal, setModal] = useState(false);
    const [editUser, setEditUser] = useState({
        title: "",
        img: "",
        _id: "",
        desc: "",
        inStock: true,
        price: "",
        color: [],
        size: [],
    });
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.product);
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    
   
    const handleDelete = async(id) => {
        dispatch(deleteProduct(id))
    }

    const handleEdit = async(id) => {
      setModal(true);
      const data = product.find((val) => val._id === id )
      setEditUser(data);
    }

    const[user, submitAcion, isPending] = useActionState(async (previousState, formData) => {
        const formDataToSend = new FormData();
          formDataToSend.append("title", formData?.get("title"));
          formDataToSend.append("desc", formData?.get("desc"));

          let categories = formData?.get("categories");
          if (categories) {
              // Split the categories by space and remove extra spaces
              let splitCategories = categories.split(",").map((category) => category.trim());
              // Append each category separately
              splitCategories.forEach((category) => {
                  formDataToSend.append("categories", category); // Append each category as a separate entry
              });
          }

          let sizes = formData?.get("size");
          if (sizes) {
              // Split the categories by space and remove extra spaces
              let splitSizes = sizes.split(",").map((size) => size.trim());
              // Append each category separately
              splitSizes.forEach((size) => {
                  formDataToSend.append("size", size); // Append each category as a separate entry
              });
          }

          let colors = formData?.get("color");
          if (colors) {
              // Split the categories by space and remove extra spaces
              let splitColors = colors.split(",").map((colors) => colors.trim());
              // Append each category separately
              splitColors.forEach((color) => {
                  formDataToSend.append("color", color); // Append each category as a separate entry
              });
          }

          formDataToSend.append("price", formData?.get("price"));
          formDataToSend.append("inStock", formData?.get("inStock"));
          formDataToSend.append("img", formData?.get("img")); // Attach the file directly
          dispatch(editProduct(formDataToSend, editUser._id))
          setModal(false)
        })
      
    return (
<div className="relative shadow-md sm:rounded-lg">
  <div className="p-3  w-full flex justify-between">
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
    <div>
        <Link to='/create'>
        <button className="block p-2.5 w-full text-sm text-gray-900 bg-blue-400 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Add New </button>
        </Link>
    </div>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          <th scope="col" className="px-4 py-3">Product</th>
          <th scope="col" className="px-4 py-3">Stock</th>
          <th scope="col" className="px-4 py-3">Price</th>
          <th scope="col" className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {product?.map((product) => (
          <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
            <td className="p-3">{product._id}</td>
            <td className="p-3 flex gap-x-1 items-center">
                <div>
                    <img src={product.img} alt="" className='border w-10 h-10 rounded-full' />
                </div>
                {product.title}
            </td>
            <td className="p-3">{product.inStock ? 'true' : 'false'}</td>
            <td className="p-3">$ {product.price}</td>
            <td className="px-6 py-4 flex gap-x-1 text-[19px]">
              <button onClick={() => handleDelete(product._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <IoTrashOutline />
              </button>
              <button onClick={() => handleEdit(product._id)} className="text-[20px] text-blue-600 dark:text-blue-400" type="button">
                <FiEdit />
              </button>
              {modal && (
                <div
                    id="authentication-modal"
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen  bg-opacity-50">
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
                    <form action={submitAcion} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className='col-span-full'>
                            <div className="rounded-lg border border-dashed border-gray-900/25 p-2">
                              <img
                              src={editUser.img}
                              className="rounded-md focus-within:outline-none h-20 focus-within:ring-offset-2"/>
                            </div>
                            </div>
                            <div className='col-span-full'>
                            <input className="block w-full text-[16px] p-2 text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                            name='img'
                            id="large_size" 
                            type="file"
                            />
                            </div>

                            <div className="col-span-2">
                            <Label htmlFor="name" labelName='Name' />
                            <input
                                type="text"
                                name="title"
                                value={editUser.title}
                                onChange={(e) => setEditUser({ ...editUser, title: e.target.value })}
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                            />
                            </div>
                            <div className="col-span-2">
                            <Label htmlFor="category" labelName='Category' />
                            <input
                                type="text"
                                name="categories"
                                id="category"
                                value={editUser.categories.join(" ")}
                                onChange={(e) => setEditUser({ ...editUser, categories: e.target.value.split(" ") })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type category name"
                            />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="price" labelName=' Price' />
                            <input
                                type="number"
                                name="price"
                                value={editUser.price}
                                onChange={(e) => setEditUser({ ...editUser, price: e.target.value })}
                                id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="category" labelName='Category'/>
                            <input
                            type="text"
                            name="size"
                            id="size"
                            value={editUser.size.join(" ")}
                            onChange={(e) => setEditUser({ ...editUser, size: e.target.value.split(" ") })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="S M"/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                            <input
                            type="text"
                            name="color"
                            id="color"
                            value={editUser.color.join(" ")}
                            onChange={(e) => setEditUser({ ...editUser, color: e.target.value.split(" ") })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Red Blue"/>
                            </div>
                            <div className="col-span-2 text-sm sm:col-span-1">
                                <Label labelName="Stcok Available" htmlFor="stock" />
                                <div className='flex items-center gap-x-1'>
                                <input type="radio" name="inStock" value="true"
                                  checked={editUser?.inStock === true}
                                  onChange={() => setEditUser({ ...editUser, inStock: true })}
                                />
                                True
                                <input type="radio" name='inStock' value="false"
                                  checked={editUser?.inStock === false}
                                  onChange={() => setEditUser({ ...editUser, inStock: false })}
                                />
                                False
                                </div>
                            </div>
                            <div className="col-span-2">
                            <Label htmlFor="description" labelName='Product Description' />
                            <textarea
                                id="description"
                                name='desc'
                                value={editUser.desc}
                                onChange={(e) => setEditUser({ ...editUser, desc: e.target.value })}
                                rows="2"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white inline-flex justify-center items-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update product
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

export default Product