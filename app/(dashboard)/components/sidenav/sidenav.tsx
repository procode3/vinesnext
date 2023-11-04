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
    <div id="sidenav" className="flex-col shadow-lg w-56 border-r-[1px]  h-[100%] p-4 dark:border-gray-600 gap-2 fixed  left-0  bg-neutral-100 z-45  opacity-[100%]">
      
      {appRoutes.map((route, idx) =>
        route.sidebarProps.child ? (
          <div key={idx} className=''>
            <div className="flex flex-row w-full items-center  my-1 rounded text-black hover:bg-orange-600 hover:text-white">
            <Link key={route.path} href={route.path!} className={`w-full rounded border border-transparent flex flex-col md:flex-row   px-4 py-2 text-[12px] justify-between transition ease-in-out duration-400 gap-[10px] ${pathname === route.path ? 'bg-orange-600 text-white' : ''}`}>
              <div className="flex  gap-2">
              {/* {route.sidebarProps!.icon} */}
                <p className="">{route.sidebarProps!.displayText}</p>
              </div>
            {/* <KeyboardArrowDownOutlinedIcon onClick={toogle} className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} w-1/8 border-gray-700 rounded-lg  mx-2 transition-transform duration-300 hover:scale-110`} /> */}
            </Link>
            </div>
            <div className={!isOpen ? 'hidden' : 'block'}>
              <div className="flex flex-col pl-4 text-sm gap-[10px]  " key={idx}>
                {route.sidebarProps.child.map((child, idx) => (
                  <Link href={child.path!} key={`P-${idx}`} className={`flex py-2 pl-[20px] rounded gap-x-2 text-sm text-black hover:bg-orange-600 items-center  hover:text-white transition ease-in-out duration-400
                  ${pathname === child.path ? 'bg-orange-600 text-white' : ''}`}>
                    {/* {child.icon} */}
                    <p  className="">{child.displayText}</p>

                  </Link>
                ))}
              </div>
            </div>
          </div>

        ) :
          (
            <Link key={idx} href={route.path!} className={`flex py-2 my-1 text-black flex-col md:flex-row rounded justify-start  active:bg-orange-600 active:text-white px-4 gap-x-2 text-[12px]  hover:bg-orange-600 hover:text-white hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'bg-orange-600 text-white' : ''}
            `} 

            >
              {/* {route.sidebarProps!.icon} */}
              <p className=""><span className="">{route.sidebarProps!.displayText}</span></p>
            </Link>
          )
      )}



    </div>
  )
}

