import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ mediaQuery }) => {
  return (
    <>
      <div
        className={`w-full md:w-[320px] ${
          mediaQuery == "mobile" ? "md:hidden" : ""
        }`}
      >
        <div className='relative w-full'>
          <input
            type='search'
            id='location-search'
            className='block p-2.5 w-full z-20 pr-10 text-sm text-gray-900 rounded-[100px] border border-gray-300 focus:ring-[#003d29] focus:border-[#003d29] focus:outline-none dark:bg-gray-700 dark:border-l-gray-700 placeholder:font-normal dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
            placeholder='Search Product'
            required
          />
          <button
            type='submit'
            className='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-transparent rounded-r-[100px] cursor-pointer '
          >
            <MdSearch className='text-[25px] text-[#333] hover:text-[#ccc] duration-200 transition-all' />
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
