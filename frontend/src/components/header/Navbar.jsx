import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import NavLinks from "./NavLinks";
import { FiUser } from "react-icons/fi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BiMenuAltRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Search from "./Search";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='md:h-[50px] md:my-[20px] md:flex justify-between items-center py-4'>
        <div className='flex justify-between items-center'>
          <Link to={`/`}>
            <img
              src={logo}
              alt='logo'
              className='cursor-pointer w-[120px] md:w-auto'
            />
          </Link>
          <div className='md:hidden'>
            {open ? (
              <IoMdClose
                className='text-[30px]'
                onClick={() => setOpen(!open)}
              />
            ) : (
              <BiMenuAltRight
                className='text-[30px]'
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>
        <div className='hidden text-[#231f1e] font-[500] leading-5 md:flex md:justify-center md:items-center md:gap-8'>
          <NavLinks />
          <Search />
        </div>
        <div className=' text-[#231f1e] font-[500] leading-5 md:flex md:justify-center md:items-center md:gap-8'>
          <div className='hidden md:flex md:justify-center md:items-center md:gap-3 cursor-pointer duration-150 transition-all'>
            <FiUser className='text-[#333] text-[22px] font-bold cursor-pointer' />
            <span className='hover:text-[#e99352]'>Account</span>
          </div>
          <div className='hidden md:flex md:justify-center md:items-center md:gap-3 cursor-pointer duration-150 transition-all'>
            <TbShoppingCartPlus className='text-[#333] text-[22px] font-bold cursor-pointer' />
            <span className='hover:text-[#e99352]'>Cart</span>
          </div>
        </div>

        {/* mobile navbar */}
        <div
          className={`absolute px-5 md:hidden h-screen w-full bg-white duration-500 transition-all ${
            open ? "left-0" : "left-[-110%]"
          }`}
        >
          <div className='w-full text-[#231f1e] font-[500] leading-5 mt-5 md:hidden'>
            <NavLinks mediaQuery='mobile' openMobileNav={open} />
          </div>
          <div className='text-[#231f1e] font-[500] leading-5 w-full mt-3 md:hidden'>
            <div className='w-full group flex gap-4 mb-6 cursor-pointer duration-150 transition-all'>
              <FiUser className='group-hover:text-[#e99352] text-[#333] text-[22px] font-bold cursor-pointer' />
              <span className='group-hover:text-[#e99352]'>Account</span>
            </div>
            <div className='w-full group flex gap-4 mb-6 cursor-pointer duration-150 transition-all '>
              <TbShoppingCartPlus className='text-[#333] group-hover:text-[#e99352] text-[22px] font-bold cursor-pointer' />
              <span className=' group-hover:text-[#e99352]'>Cart</span>
            </div>
          </div>
          <Search mediaQuery='mobile' />
        </div>
      </div>
    </>
  );
};

export default Navbar;
