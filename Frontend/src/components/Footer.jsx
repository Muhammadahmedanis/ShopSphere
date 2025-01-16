import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const list = [
        {
            header: "Quick Link",
            title:[
                {subTitle: "Home"},
                {subTitle: "Who are we"},
                {subTitle: "Our Philosophy"}
            ]
        },
        {
            header: "Industries",
            title:[
                {subTitle: "Retail & E-Commerce"},
                {subTitle: "Information Technology"},
                {subTitle: "Finance & Insurance"}
            ]
        },
        {
            header: "Services",
            title:[
                {subTitle: "Translation"},
                {subTitle: "Proofreading & Editing"},
                {subTitle: "Content Creation"}
            ]
        },
        {
            header: "Contact Us",
            title:[
                {subTitle: "+880 768 473 4978"},
                {subTitle: "info@gmail.com"},
                {subTitle: "info@.com"}
            ]
        },
    ]

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                list.map((val, ind) => (
                    <div key={ind}>
                        <p className="font-semibold text-gray-800 dark:text-white">{val.header}</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            {
                                val.title.map((val, ind) => (
                                    <li className="text-black dark:text-white" key={ind}>{val.subTitle}</li>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </ul>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Link to='/' className='font-bold text-3xl '>
            WOOD <span className='text-yellow-500 '>COM</span>
          </Link>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
            © Copyright 2021. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;