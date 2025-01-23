import React, { useActionState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QiEw1LgwSSYx4xAHVWHK9Aarq765JxeUHD1q04ytwg4nnGYZ6clIgLJN5DdU4rn8Pg4PaU1kUCXbWcXuMlkgNpU00dH5bw8GR');

const Checkout = () => {
  const { data , totalAmount, totalItems } = useSelector((state) => state.cart);
  const[user, submitAcion, isPending] = useActionState(async (previousState, formData) => {
    // const payload =  {
    //   firstName: formData?.get("first name"),
    //   lastName: formData?.get("last name"),
    //   email: formData?.get("email"),
    //   number: formData?.get("number"),
    //   address: formData?.get("address"),
    //   city: formData?.get("city"),
    //   state: formData?.get("state"),
    //   sipCode: formData?.get("zip code"),
    // }
    // const userData = {
    //   payload,
    //   userId: data[0].userId,
    //   amount: data[0].price,
    //   productId: data[0]._id,
    // }
    // console.log(userData);
  })
  // console.log(data);
  // formDataToSend.append("color", formData?.get("color").split(" "));
  // dispatch(createProduct(formDataToSend));
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 md:h-auto">
        {/* Sidebar */}
        <div className=" lg:min-w-[370px] sm:min-w-[300px] md:h-auto">
          <div className="relative h-auto bg-gray-100">
            <div className=" px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)] md:h-auto lg:mb-10">
              <div className="space-y-4 mb-4">
                { 
                data?.map((product, index) => (
                  <div key={index} className="flex items-start gap-4 min-h-32">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                      <img src={product.img} alt={product.name} className="w-full object-contain" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm lg:text-base text-gray-800">{product.title}</h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-3">
                        <li className="flex flex-wrap gap-4 text-[14px]">
                          Quantity: <span className="ml-auto">{product.quantity}</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-[14px]">
                          Price: <span className="ml-auto">{product.price}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Total */}
            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                Total <span className="ml-auto">${totalAmount}</span>
              </h4>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form action={submitAcion} className="mt-8">
            {/* Personal Details */}
            {/* <div>
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name='first name'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name='last name'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="email"
                  name='email'
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="number"
                  name='number'
                  placeholder="Phone No."
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div> */}

            {/* Shipping Address */}
            <div className="mt-8">
              {/* <h3 className="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address"
                  name='address'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="City"
                  name='city'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="State"
                  name='state'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  name='zip code'
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div> */}

              {/* Buttons */}
              <div className="flex gap-4 max-md:flex-col mt-8">
                <button
                  type="button"
                  className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
