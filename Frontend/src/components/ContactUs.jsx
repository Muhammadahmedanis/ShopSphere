import React from "react";

const ContactUs = () => {
  return (
    <div className="relative">
      <div className="m-16">
        <div className="grid grid-cols-1 place-items-end">
          <div className="bg-transparent lg:bg-white text-white lg:text-black font-semibold p-10">
            <div className="p-5">
              <h4 className="uppercase text-2xl mb-4">Hello Customer!</h4>
              <h2 className="uppercase text-2xl">Visit our store</h2>
            </div>
            <div className="p-4 text-xl font-normal">
              <p className="mb-4">21 W. 46th St., New York, United States</p>
              <p className="mb-4">Bigboom@domain.com</p>
              <p>+84 (800) 3333 4567</p>
            </div>
            <div className="p-4">
              <button
                type="button"
                className="bg-red-500 hover:bg-black pt-4 pb-4 pl-8 pr-8 uppercase text-xl text-white font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <img className="h-full w-full object-cover" src="images/banner/id1-banner2.jpg" alt="img" />
      </div>
    </div>
  );
};

export default ContactUs;