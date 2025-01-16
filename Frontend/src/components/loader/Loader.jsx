import React from 'react';
import './loader.css';
const Loader = () => {
   
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='mt-8 '>
       <h2 className='text-xl font-bold '>Meraki</h2>
      </div>
    </div>
  );
};

export default Loader;