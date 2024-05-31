import React from "react";
import Navbar from "./Navbar";
import { FiPhone } from "react-icons/fi";

const Header = () => {
  return (
    <>
      <div className='py-[2px] bg-[#003d29] md:py-[8px] '>
        <marquee className='md:hidden'>
          <div className=' section flex  gap-5'>
            <div className='text-[10px] flex items-center gap-1 text-white font-Poppins'>
              <FiPhone className='text-xsm' />
              <span>+2348045410944</span>
            </div>
            <div className='text-[10px] flex items-center gap-4 leading-5 md:text-[12px] text-white  font-Poppins'>
              <span>Get 50% Off on Selected Items</span>
              <span> | </span>
              <span>Shop Now</span>
            </div>
          </div>
        </marquee>
        <div className='hidden section md:flex md:justify-between md:items-center'>
          <div className='text-[10px] flex items-center gap-1 md:leading-[14px] md:text-[12px] text-white font-Poppins'>
            <FiPhone className='text-xsm md:text-[14px]' />
            <span>+2348045410944</span>
          </div>
          <div className='text-[10px] flex items-center gap-4 leading-5 md:text-[12px] text-white  font-Poppins'>
            <span>Get 50% Off on Selected Items</span>
            <span> | </span>
            <span>Shop Now</span>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-md md:shadow-none relative'>
        <div className='section'>
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Header;
