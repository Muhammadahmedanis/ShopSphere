import React from 'react'

function Input({type, placeholder, name }) {
  return (
    <input type={type} placeholder={placeholder} name={name} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
  )
}

export default Input