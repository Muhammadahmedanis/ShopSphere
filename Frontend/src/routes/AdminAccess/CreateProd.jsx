import React, { useActionState } from 'react'
import Label from '../../components/Label';

function CreateProd() {
    const[user, submitAcion, isPending] = useActionState(async (previousState, formData) => {
        const payload = {
            title: formData?.get("title"),
            img: formData?.get("img"),
            desc: formData?.get("desc"),
            price: formData?.get("price"),
            size: formData?.getAll("size"),
            color: formData?.getAll("color"),
            inStock: formData?.get("stock"),
        }
        console.log(payload);
    })

  return (
    <div className="p-4 border border-black m-4 w-96 mx-auto">
    <h1 className='ps-4 font-bold'>Create Form</h1>
    <form action={submitAcion} className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
            <div className='col-span-full'>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-5">
                <div className="text-center">
                    {/* <FaImage className='text-gray-400 m-auto' size={50} /> */}
                <div className="mt-4 flex text-sm text-gray-600">
                    <img
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"/>
                </div>
                </div>
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
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
            />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="price" labelName=' Price' />
            <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"/>
            </div>
            <div className="col-span-2 text-sm sm:col-span-1">
                <Label labelName="Stcok Available" htmlFor="stock" />
                <div className='flex items-center gap-x-1'>
                <input type="radio" name="stock" value="true"
                />
                True
                <input type="radio" name='stock' value="false"
                />
                False
                </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="category" labelName='Select Color'/>
                <select
                    id="category"
                    name='color'
                    multiple
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="Red" name="Red">Red</option>
                    <option value="Blue" name="Blue">Blue</option>
                    <option value="Black" name="Black">Black</option>
                    <option value="Gray" name="Gray">Gray</option>
                    <option value="Green" name="Green">Green</option>
                </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="category" labelName='Select Size'/>
            <select
                id="category"
                name='size'
                multiple
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="XS" name="XS">XS</option>
                <option value="S" name="S">S</option>
                <option value="M" name="M">M</option>
                <option value="L" name="L">L</option>
            </select>
            </div>
            <div className="col-span-2">
            <Label htmlFor="description" labelName='Product Description' />
            <textarea
                id="description"
                name='desc'
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write product description here"></textarea>
            </div>
        </div>
        <button
            type="submit"
            className="text-white inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update product
            { isPending && <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> }
        </button>
        </form>
        </div>
  )
}

export default CreateProd