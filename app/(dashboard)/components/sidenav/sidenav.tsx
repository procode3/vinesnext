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
    <div className="flex flex-col shadow-lg w-14  md:w-64 border-r-[1px]  min-h-screen p-4 dark:border-gray-600">
      <h2 className='text-2xl font-semibold mx-auto pb-6'>Writers
        <span className='text-2xl font-semibold text-[#000] '>√ine</span></h2>
      {appRoutes.map((route, idx) =>
        route.sidebarProps.child ? (
          <div key={idx}>
            <div className={`flex my-1 rounded  px-4 gap-x-2 py-2 text-[14px] hover:bg-[#132C33] hover:text-[#D8E3E7] transition ease-in-out duration-400`} key={idx}>
              {route.sidebarProps!.icon}
              <div className="flex w-80 justify-between">
                <Link key={route.path} href={route.path!} className="">{route.sidebarProps!.displayText}</Link>
                <KeyboardArrowDownOutlinedIcon onClick={toogle} className={!isOpen ? 'rotate-0 transition-all duration-500' : 'rotate-180 transition transform duration-300'} />

              </div>
            </div>
            <div className={!isOpen ? 'hidden' : 'block'}>
              <div className="flex flex-col pl-12 text-sm " key={idx}>
                {route.sidebarProps.child.map((child, idx) => (
                  <div key={`P-${idx}`} className={`flex p-1 rounded gap-x-2 text-sm text-[#132C33] hover:bg-[#132C33] hover:text-[#D8E3E7] transition ease-in-out duration-400
                  ${pathname === child.path ? 'font-semibold text-opacity-100' : 'text-muted-foreground'}`}>
                    {child.icon}
                    <Link href={child.path!} className="">{child.displayText}</Link>

                  </div>
                ))}

              </div>
            </div>
          </div>

        ) :
          (
            <div className={`flex py-2 my-1 text-[#132C33]  rounded px-4 gap-x-2 text-[14px]  hover:bg-[#132C33] hover:text-[#D8E3E7] hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'font-semibold' : 'font-normal'}
            `} key={idx}

            >
              {route.sidebarProps!.icon}
              <Link key={idx} href={route.path!} className="">{route.sidebarProps!.displayText}</Link>
            </div>
          )
      )}



    </div>
  )
}

