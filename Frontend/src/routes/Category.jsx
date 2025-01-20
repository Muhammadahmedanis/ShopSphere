import { useState } from 'react';
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { HiFunnel, HiSquares2X2 } from "react-icons/hi2";
import { FaCartShopping, FaHeart, FaEye, } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { useLocation } from 'react-router-dom';
import BestSeller from '../components/BestSeller';

const sortOptions = [
  // { name: 'Most Popular',  current: true },
  // { name: 'Best Rating', current: false },
  { name: 'Newest' },
  { name: 'Low to High' },
  { name: 'High to Low'},
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
      { value: 'pink', label: 'Pink', checked: false },
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
  // {
  //   id: 'category',
  //   name: 'Category',
  //   options: [
  //     { value: 'Man', label: 'Man', checked: false },
  //     { value: 'Woman', label: 'Woman', checked: false },
  //   ],
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {

const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
const [sortMenuOpen, setSortMenuOpen] = useState(false);
const [qty] = useState(1);
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


  const location =  useLocation();
  const category = location.pathname.split("/")[2];

  const[filter, setFilter] = useState({});
  const[sort, setSort] = useState("");

  const handleFilter = (e) => {
    const { name, value, checked } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: checked ? 
      [...(prevFilter[name] || []), value] :
      (prevFilter[name]).filter(item => item !== value),
    }))
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
                              onChange={handleFilter}
                              value={option.label}
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
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {category}
            </h1>
            <div className="flex items-center">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="group inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <IoIosArrowDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-500" />
                </button>
                {sortMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow-lg rounded-md">
                    <ul className="py-1 cursor-pointer">
                      {sortOptions.map((option) => (
                        <li key={option.name} className='px-4 py-1 text-sm text-gray-500' onClick={() => setSort(option.name)}>
                          {option.name}
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-2">
              {/* Sidebar Filters */}
              <aside className="hidden lg:block">
                <form>
                  <div>
                    {filters.map((section) => (
                      <div key={section.id} className="border-b border-gray-200 py-4">
                        <h3 className="font-medium text-gray-900">{section.name}</h3>
                        <div className="mt-4 space-y-4">
                          {section.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                              type="checkbox"
                              name={section.id}
                              value={option.label}
                              onChange={handleFilter}
                              id={option.value}
                              // defaultChecked={option.checked}
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
              <div className="lg:col-span-4">
                <h2 className="sr-only">Products</h2>
                {/* Product List */}
                <BestSeller category={category} sort={sort} filter={filter} />
                </div>
              </div>
          </section>
        </main>
      </div>
    </div>
  );
}
