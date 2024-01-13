"use client"
import React, { Fragment } from 'react'
import { getAdminRoutes, Route } from '../../data/appRoutes/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export default function Sidenav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toogle = () => setIsOpen(!isOpen);
  const pathname = usePathname();




  const appRoutes: Route[] = getAdminRoutes()
  return (
    <div id="sidenav" className="flex-col shadow-lg w-[70px] md:w-[250px] border-r-[1px]  h-[100%] p-4 dark:border-gray-600  fixed  left-0  bg-slate-800 z-10  opacity-[100%] text-xl items-center">
      
      {appRoutes.map((route, idx) =>
        route.sidebarProps.child ? (
          <div key={idx} className=''>
            <div className="flex flex-row w-full items-center  my-2 rounded-3xl text-white hover:bg-white hover:text-black">
            <Link key={route.path} href={route.path!} className={`w-full rounded-full border border-transparent flex flex-col md:flex-row  py-4  justify-between px-16 transition ease-in-out duration-400 gap-[10px] ${pathname === route.path ? 'bg-gray-100 text-black' : ''}`}>
              <div className="flex  gap-2">
              {route.sidebarProps!.icon}
                <p className="">{route.sidebarProps!.displayText}</p>
              </div>
            {/* <KeyboardArrowDownOutlinedIcon onClick={toogle} className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} w-1/8 border-gray-700 rounded-lg  mx-2 transition-transform duration-300 hover:scale-110`} /> */}
            </Link>
            </div>
            <div className={!isOpen ? 'block' : 'block'}>
              <div className="flex flex-col pl-4  gap-[10px]  " key={idx}>
                {route.sidebarProps.child.map((child, idx) => (
                  <Link href={child.path!} key={`P-${idx}`} className={`flex py-2 pl-[20px] rounded-full gap-x-2 text-gray-100 hover:bg-white hover:text-black items-center  transition ease-in-out duration-400
                  ${pathname === child.path ? 'bg-purple-600 text-white' : ''}`}>
                    {/* {child.icon} */}
                    <p  className="">{child.displayText}</p>

                  </Link>
                ))}
              </div>
            </div>
          </div>

        ) :
          (
            <Link key={idx} href={route.path!} className={`flex py-2 md:py-4 my-7 hover:bg-white hover:text-black flex-col md:flex-row rounded-full justify-center md:justify-start  p-4 md:pl-16 active:bg-white  active:text-black md:gap-x-5   hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'bg-white text-black' : 'text-white'}
            `} 

            >
              {route.sidebarProps!.icon}
              <p className=""><span className="hidden md:block">{route.sidebarProps!.displayText}</span></p>
            </Link>
          )
      )}



    </div>
  )
}

