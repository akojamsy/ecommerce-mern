import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NavLinks = ({ mediaQuery, openMobileNav }) => {
  const links = [
    {
      name: "Category",
      icon: <RiArrowDropDownLine />,
      subMenu: true,
      link: "/",
      subLinks: [
        {
          Head: "Furniture",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec6052dc39b839500c1f8a_Rectangle%201436.png",
          count: 245,
        },
        {
          Head: "Hand Bag",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec605386e48004f02ee6a8_Rectangle%201436-4.png",
          count: 567,
        },
        {
          Head: "Shoe",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec6052f0ed215b864af96e_Rectangle%201436-1.png",
          count: 245,
        },
        {
          Head: "Headphone",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec6053e5b15cfafd550cbb_Rectangle%201436-3.png",
          count: 567,
        },
        {
          Head: "Laptop",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec6052dc39b839500c1f8a_Rectangle%201436.png",
          count: 245,
        },
        {
          Head: "Book",
          image:
            "https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63ec6052dc39b839500c1f8a_Rectangle%201436.png",
          count: 567,
        },
      ],
    },
    { name: "Deals", link: "/" },
    { name: "New", link: "/" },
    { name: "Delivery", link: "/" },
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(openMobileNav && false);

  useEffect(() => {
    setOpen(false);
  }, [openMobileNav]);

  return (
    <>
      {links.map((link, i) => (
        <div key={i} className='relative group py-3 text-left'>
          <div
            className={`flex cursor-pointer ${
              mediaQuery !== "mobile" ? "md:justify-center items-center" : ""
            }`}
            onClick={() => {
              if (link.subMenu) {
                setOpen(!open);
              } else {
                navigate(link.link);
              }
            }}
          >
            <h1 className=' group-hover:text-[#e99352]'>{link?.name}</h1>
            <span className='ml-2 text-[25px] group-hover:text-[#e99352] '>
              {link?.icon}
            </span>
          </div>
          {link.subMenu && open && (
            <div className=''>
              {/* <div className='py-3'>
                <div className='w-4 h-4 left-3 top-10 absolute mt-1 bg-white rotate-45 shadow-'></div>
              </div> */}
              <div className='shadow-sm md:absolute md:block top-12 left-0 w-auto  md:w-[700px] bg-white rounded-md md:shadow-lg border border-t-gray-100 py-4 px-3 md:py-7 md:px-7'>
                <div className='border border-b-1 border-t-0  border-l-0 border-r-0 border-b-slate-200  pb-3 mb-3 md:pb-6 md:mb-6'>
                  <h2 className='text-[#231f1e] text-[14px] md:text-[18px] font-Poppins font-semibold'>
                    Popular Categories
                  </h2>
                </div>
                <div className=' grid md:grid-flow-row-dense md:grid-cols-2 md:grid-rows-3 gap-3 md:gap-7'>
                  {link?.subLinks?.map((sublink, i) => (
                    <div
                      key={i}
                      className='mx py-2 col-span-1 flex  items-center gap-4 bg-[#f5f6f6] rounded-md'
                    >
                      <div className=''>
                        {sublink?.image && (
                          <img
                            src={sublink?.image}
                            alt='category'
                            className='ml-2 object-contain'
                          />
                        )}
                      </div>
                      <div className='flex-col gap-4'>
                        <h1>{sublink?.Head}</h1>
                        <p className='text-[14px] font-semibold leading-5 text-[#666666] '>
                          <span className='pr-2'>{sublink?.count} items</span>
                          <span>Available</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
