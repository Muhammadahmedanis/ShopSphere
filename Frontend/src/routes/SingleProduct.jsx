import { useState } from 'react'
import { FaStar } from "react-icons/fa6";

// const product = {
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     // { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: false },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
// const reviews = { href: '#', average: 4, totalCount: 117 }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function SingleProduct() {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (

    <div className="font-[sans-serif] p-4">
  <div className="xl:max-w-screen-xl lg:max-w-screen-lg max-w-xl mx-auto">
    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
      <div className="w-full lg:sticky top-0 lg:col-span-3">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2 w-16 max-sm:w-10 shrink-0">
            <img
              src="https://readymadeui.com/images/product6.webp"
              alt="Product1"
              className="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-black"
            />
            <img
              src="https://readymadeui.com/images/product5.webp"
              alt="Product2"
              className="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-transparent"
            />
            <img
              src="https://readymadeui.com/images/product2.webp"
              alt="Product3"
              className="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-transparent"
            />
            <img
              src="https://readymadeui.com/images/product3.webp"
              alt="Product4"
              className="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-transparent"
            />
            <img
              src="https://readymadeui.com/images/product1.webp"
              alt="Product5"
              className="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-transparent"
            />
          </div>
          <div className="flex-1">
            <img
              src="https://readymadeui.com/images/product6.webp"
              alt="Product"
              className="w-full aspect-[750/800] object-top object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:col-span-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Adjective Attire | T-shirt</h3>
          <div className="flex items-center space-x-1 mt-2">
            {Array(4)
              .fill()
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-purple-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            <svg
              className="w-4 h-4 fill-[#CED5D8]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <p className="text-sm text-gray-800 !ml-3">4.0 (150)</p>
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-6">
            <h4 className="text-gray-800 text-2xl font-bold">$17</h4>
            <p className="text-gray-500 text-lg">
              <strike>$22</strike> <span className="text-sm ml-1.5">Tax included</span>
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div>
          <h3 className="text-lg font-bold text-gray-800">Sizes</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {["SM", "MD", "LG", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                className={`w-10 h-9 border ${
                  size === "MD" ? "border-purple-600 text-purple-800" : "border-gray-300 text-gray-800"
                } hover:border-purple-600 text-sm flex items-center justify-center shrink-0`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Colors</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {["red-600", "black", "green-500", "purple-600"].map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-10 h-9 bg-${color} border ${
                    idx === 1 ? "border-purple-600" : "border-transparent"
                  } hover:border-purple-600 text-sm flex items-center justify-center shrink-0`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            className="px-4 py-3 w-[45%] border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold"
          >
            Add to wishlist
          </button>
          <button
            type="button"
            className="px-4 py-3 w-[45%] border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold"
          >
            Add to cart
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        <div>
  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Select Delivery Location</h3>
  <p className="text-gray-500 text-sm mt-1">
    Enter the pincode of your area to check product availability.
  </p>
  <div className="flex items-center gap-2 mt-4 max-w-sm">
    <input
      type="number"
      placeholder="Enter pincode"
      className="bg-white px-4 py-2.5 text-sm w-full border border-gray-300 outline-0"
    />
    <button
      type="button"
      className="border border-purple-600 outline-none bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 text-sm"
    >
      Apply
    </button>
  </div>
  <div className="flex justify-between gap-4 mt-6">
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 fill-purple-600 inline"
        viewBox="0 0 64 64"
      >
        <g data-name="Layer 2">
          <path d="M59.89 13.36L49.73 7.495a4.21 4.21 0 0 0-4.2 0l-10.163 5.867A4.213 4.213 0 0 0 33.267 17v11.733a4.213 4.213 0 0 0 2.1 3.637L45.53 38.24a4.217 4.217 0 0 0 4.2 0l10.161-5.867a4.213 4.213 0 0 0 2.1-3.637V17a4.212 4.212 0 0 0-2.1-3.64zM12.647 56.578a.6.6 0 0 1-.6.6H6.21a.6.6 0 0 1-.6-.6V40.852a.6.6 0 0 1 .6-.6h5.838a.6.6 0 0 1 .6.6zm40.518-3.324-15.663 4.778a7.84 7.84 0 0 1-5.233-.24l-7.262-2.974a5.428 5.428 0 0 0-2.247-.498h-6.515V42.74l9.6-3.12a2.98 2.98 0 0 1 1.83-.008l9.749 3.084a2.009 2.009 0 0 1 1.2 1.07 2.407 2.407 0 0 1 .089 1.894 1.966 1.966 0 0 1-2.064 1.338l-8.572-1.2a1.8 1.8 0 0 0-.502 3.565l8.573 1.2a5.406 5.406 0 0 0 5.152-2.209h13.02a1.334 1.334 0 0 1 1.231 1.417c0 .047 0 .094.006.14a3.445 3.445 0 0 1-2.392 3.343zM21.62 32.167a1.8 1.8 0 0 0 1.8-1.8V29a1.578 1.578 0 0 0 .227-.022 5.214 5.214 0 0 0-.36-10.416h-3.058a1.628 1.628 0 0 1-.01-3.257h5.89a1.8 1.8 0 0 0 0-3.6h-2.69v-1.356a1.8 1.8 0 0 0-3.6 0v1.395a5.202 5.202 0 0 0 .048 10.38 1.81 1.81 0 0 0 .36.036h3.054a1.627 1.627 0 1 1 0 3.254H16.52a1.8 1.8 0 0 0 0 3.6h3.3v1.357a1.8 1.8 0 0 0 1.8 1.796z" />
          <path d="M8.764 32.376a1.8 1.8 0 0 0 1.411-2.914 14.578 14.578 0 0 1-3.15-9.102 14.724 14.724 0 0 1 24.7-10.836 1.8 1.8 0 0 0 2.435-2.65A18.326 18.326 0 0 0 7.345 31.692a1.8 1.8 0 0 0 1.42.685z" />
        </g>
      </svg>
      <p className="text-gray-500 text-xs sm:text-sm mt-3">COD available</p>
    </div>
    <div className="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-purple-600 inline" viewBox="0 0 100 100">
        <path d="M98 50c0 26.467-21.533 48-48 48S2 76.467 2 50c0-1.658 1.342-3 3-3s3 1.342 3 3c0 23.159 18.841 42 42 42s42-18.841 42-42S73.159 8 50 8c-11.163 0-21.526 4.339-29.322 12H32c1.658 0 3 1.342 3 3s-1.342 3-3 3H14c-1.658 0-3-1.342-3-3V5c0-1.658 1.342-3 3-3s3 1.342 3 3v10.234C25.851 6.786 37.481 2 50 2c26.467 0 48 21.533 48 48zM77 38v27c0 1.251-.776 2.37-1.945 2.81l-24 9a3.04 3.04 0 0 1-2.11 0l-24-9A3.003 3.003 0 0 1 23 65V38c0-1.251.776-2.37 1.945-2.81l24-9a3.036 3.036 0 0 1 2.109 0l24 9A3.002 3.002 0 0 1 77 38zm-42.457 0L50 43.795 65.457 38 50 32.205zM29 62.92l18 6.75V49.08l-18-6.75zm42 0V42.33l-18 6.75v20.59z" />
      </svg>
      <p className="text-gray-500 text-xs sm:text-sm mt-3">15-Day Return Policy</p>
    </div>
    <div className="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-purple-600 inline" viewBox="0 0 32 32">
        <g data-name="Layer 24">
          <path d="M31.385 15.434L28.055 9.884a1.11 1.11 0 0 0-.955-.544h-6.66V8.23a1.11 1.11 0 0 0-1.11-1.11h-2.22a1.11 1.11 0 0 0 0 2.22h1.11v13.32h-7.837a3.863 3.863 0 0 0-5.416 0H2.68v-5.55a1.11 1.11 0 0 0-2.22 0v6.66a1.11 1.11 0 0 0 1.11 1.11h2.276a4.44 4.44 0 0 0 0 .555 3.885 3.885 0 0 0 7.77 0 4.44 4.44 0 0 0-.056-.555h8.991a4.44 4.44 0 0 0-.056.555 3.885 3.885 0 0 0 7.77 0 4.44 4.44 0 0 0-.055-.555h2.22a1.11 1.11 0 0 0 1.11-1.11V16a1.11 1.11 0 0 0-.155-.566zm-2.92-.544H24.88v-3.33h1.587zM7.675 27.1a1.665 1.665 0 1 1 1.665-1.665A1.665 1.665 0 0 1 7.675 27.1zm16.65 0a1.665 1.665 0 1 1 1.665-1.665 1.665 1.665 0 0 1-1.665 1.665zm2.708-4.44a3.863 3.863 0 0 0-5.416 0H20.44v-11.1h2.22V16a1.11 1.11 0 0 0 1.11 1.11h5.55v1.11h-1.11a1.11 1.11 0 0 0 0 2.22h1.11v1.11h-1.11a1.11 1.11 0 0 0 0 2.22h1.165v1.11z" />
          <path d="M10.595 8.53a1.11 1.11 0 0 0-1.57 0l-5.55 5.55a1.11 1.11 0 1 0 1.57 1.57l3.14-3.14V21.1a1.11 1.11 0 0 0 2.22 0v-8.59l3.14 3.14a1.11 1.11 0 0 0 1.57-1.57z" />
        </g>
      </svg>
      <p className="text-gray-500 text-xs sm:text-sm mt-3">Secure delivery</p>
    </div>
  </div>
</div>

      </div>
    </div>

    <div className="mt-12 bg-gray-100 px-6 py-12">
      <div className="xl:max-w-screen-xl max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">PRODUCT INFORMATION</h3>
            <div>
              <h3 className="text-gray-800 text-sm font-bold">Material:</h3>
              <p className="text-sm text-gray-500 mt-2">100% Organic Cotton</p>
            </div>
            <div>
              <h3 className="text-gray-800 text-sm font-bold">Care Guidelines:</h3>
              <p className="text-sm text-gray-500 mt-2">Wash cold, tumble dry low, do not bleach.</p>
            </div>
            <div>
              <h3 className="text-gray-800 text-sm font-bold">Features:</h3>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-gray-500">
                <li>Eco-friendly, breathable fabric.</li>
                <li>Classic fit for everyday comfort.</li>
                <li>Durable stitching for long-lasting wear.</li>
                <li>Available in multiple colors and sizes.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">SHIPPING & RETURNS</h3>
            <div className="space-y-4">
              {[
                { title: "Standard Shipping", details: "Delivery in 3-5 business days", price: "$5.00" },
                { title: "Expedited Shipping", details: "Delivery in 1-2 business days", price: "$15.00" },
                { title: "Pickup Option", details: "Available within 24 hours", price: "FREE" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 text-sm font-bold mb-2">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.details}</p>
                  </div>
                  <span className="text-gray-800 text-sm font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Returns and exchanges are free and accepted within 30 days of purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}