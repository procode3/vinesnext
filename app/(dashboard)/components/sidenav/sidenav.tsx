"use client"
import React, { Fragment } from 'react'
import { getAdminRoutes, Route } from '../../data/appRoutes/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export default function Sidenav() {
  const [isOpen, setIsOpen] = React.useState(true);
  const toogle = () => setIsOpen(!isOpen);
  const pathname = usePathname();




  const appRoutes: Route[] = getAdminRoutes()
  return (
    <div id="sidenav" className="flex-col shadow-lg w-64 border-r-[1px]  min-h-screen p-4 dark:border-gray-600 gap-[20px] fixed  left-0  bg-neutral-100 z-10  opacity-100">
      
      {appRoutes.map((route, idx) =>
        route.sidebarProps.child ? (
          <div key={idx} className=''>
            <div className="flex flex-row justify-between items-center  my-1 rounded text-[#132C33] hover:bg-orange-600 hover:text-[#D8E3E7]">
            <Link key={route.path} href={route.path!} className={`flex flex-col md:flex-row  gap-x-2 px-4 py-2 text-[14px]  transition ease-in-out duration-400 gap-[10px]`}>
              <div className="flex md:w-[120px] gap-[5px]">
              {/* {route.sidebarProps!.icon} */}
                <p className="">{route.sidebarProps!.displayText}</p>
              </div>
            </Link>
            <KeyboardArrowDownOutlinedIcon onClick={toogle} className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 hover:scale-110`} />
            </div>
            <div className={!isOpen ? 'hidden' : 'block'}>
              <div className="flex flex-col pl-4 text-sm gap-[10px]  " key={idx}>
                {route.sidebarProps.child.map((child, idx) => (
                  <Link href={child.path!} key={`P-${idx}`} className={`flex py-2 pl-[20px] rounded gap-x-2 text-sm text-[#132C33] hover:bg-orange-600 items-center  hover:text-[#D8E3E7] transition ease-in-out duration-400
                  ${pathname === child.path ? 'font-semibold text-opacity-100' : 'text-muted-foreground'}`}>
                    {/* {child.icon} */}
                    <p  className="">{child.displayText}</p>

                  </Link>
                ))}

              </div>
            </div>
          </div>

        ) :
          (
            <Link key={idx} href={route.path!} className={`flex py-2 my-1 text-[#132C33] flex-col md:flex-row rounded justify-start  active:bg-orange-600 active:text-[#D8E3E7] px-4 gap-x-2 text-[14px]  hover:bg-orange-600 hover:text-[#D8E3E7] hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'font-semibold' : 'font-normal'}
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

