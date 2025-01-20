import { useState } from 'react';
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { HiFunnel, HiSquares2X2 } from "react-icons/hi2";
import { FaCartShopping, FaHeart, FaEye, } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];


const products = [
    {
      id: 1,
      img: "/images/product/product1.jpg",
      name: "BEDROOM",
      price: "55.00",
    },
    {
      id: 2,
      img: "/images/product/product2.jpg",
      name: "OFFICE",
      price: "65.00",
    },
    {
      id: 3,
      img: "/images/product/product6.jpg",
      name: "LIGHTING",
      price: "85.00",
    },
    {
      id: 4,
      img: "/images/product/product5.jpg",
      name: "BATHROOM",
      price: "95.00",
    },
    {
      id: 5,
      img: "/images/product/product4.jpg",
      name: "KITCHEN",
      price: "35.00",
    },
    {
      id: 6,
      img: "/images/product/product3.jpg",
      name: "INTERIOR",
      price: "50.00",
    },

];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Man', label: 'Man', checked: false },
      { value: 'Woman', label: 'Woman', checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
//   const[menuItem, setMenuItem] = useState(products);
    const [qty] = useState(1);
    // const filterItems = (name) => {
    //   const newItems = products.filter((item) => item.name === name);
    //   setMenuItem(newItems); 
    //   if(name === 'all'){
    //     setMenuItem(products)
    //     return;
    //   }
    // }
  
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
    let totalPrice = qty * item.price;

    const tempProduct = {
        ...item,
        quantity: qty,
        totalPrice, 
    }
    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
    }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/25"
              onClick={() => setMobileFiltersOpen(false)}
            ></div>
            <div className="relative ml-auto max-w-xs w-full bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-400"
                >
                  <IoMdClose className="w-6 h-6" />
                </button>
              </div>
              <form className="px-4 py-6">
                {/* <h3 className="font-medium text-gray-900">Categories</h3>
                <ul className="mt-4 space-y-4">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="text-gray-700">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul> */}
                <div className="mt-6">
                  {filters.map((section) => (
                    <div key={section.id} className="border-t border-gray-200 py-4">
                      <h3 className="font-medium text-gray-900">{section.name}</h3>
                      <div className="mt-4 space-y-4">
                        {section.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={option.value}
                              name={section.id}
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                            />
                            <label
                              htmlFor={option.value}
                              className="ml-3 text-sm text-gray-700"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>
            <div className="flex items-center">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="group inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <IoIosArrowDown
                    className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-500"
                  />
                </button>
                {sortMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow-lg rounded-md">
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <li key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                <HiSquares2X2 size={22} />
              </button>
              <button
                className="ml-1 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <HiFunnel size={22} />
              </button>
            </div>
          </div>
          <section className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6">
              {/* Sidebar Filters */}
              <aside className="hidden lg:block">
                <form>
                  {/* <h3 className="font-medium text-gray-900">Categories</h3> */}
                  {/* <ul className="mt-4 space-y-4">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="text-gray-700">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul> */}
                  <div>
                    {filters.map((section) => (
                      <div key={section.id} className="border-b border-gray-200 py-4">
                        <h3 className="font-medium text-gray-900">{section.name}</h3>
                        <div className="mt-4 space-y-4">
                          {section.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={option.value}
                                name={section.id}
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                              />
                              <label
                                htmlFor={option.value}
                                className="ml-3 text-sm text-gray-700"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </aside>
              {/* Product Grid */}
              <div className="lg:col-span-3">
                <h2 className="sr-only">Products</h2>
                {/* Product List */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 border border-dashed border-gray-500 rounded">
                  {/* Add product components here */}
                    { products?.map((val, ind) => (
                    <div className="mx-auto max-w-[220px] relative" key={ind}>
                        <div className="p-1 hover:bg-gray-200 hover:shadow transition-all duration-300 relative group">
                            <img src={val.img} alt="prodImg" className="mx-auto " />
                            <div className="icon absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ">
                            <div className="flex flex-wrap flex-col p-2 m-1 mt-1">
                                <FaCartShopping onClick={() => handleAddToCart(val)} size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                                <FaHeart size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                                <FaEye size={35} className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white" />
                            </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-semibold uppercase">{val.name}</div>
                            <div className="">{val.price}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
              </div>
          </section>
        </main>
      </div>
    </div>
  );
}
