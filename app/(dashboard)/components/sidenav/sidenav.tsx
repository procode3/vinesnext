"use client"
import React from 'react'
import {getAdminRoutes, Route} from '../../data/appRoutes/routes'
import Link from 'next/link'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export default function Sidenav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toogle = () => setIsOpen(!isOpen);


  const appRoutes: Route[] = getAdminRoutes()
  return (
    <div className="flex flex-col w-64 h-screen px-8 py-8 text-[#000]  bg-[#0C7076] bg-opacity-20 dark:border-gray-600">
        {appRoutes.map((route, idx) => 
        route.sidebarProps.child? (
          <>
           <div className="flex py-2 my-2 px-4 gap-x-4  text-l hover:bg-[#05161A] hover:bg-opacity-30 " key={idx}>
              {route.sidebarProps!.icon}
              <div className="flex w-80 justify-between">
              <Link key={route.path} href={route.path!} className="">{route.sidebarProps!.displayText}</Link>
              <KeyboardArrowDownOutlinedIcon onClick={toogle} className={!isOpen ? 'rotate-0 transition duration-500' : 'rotate-180 transition duration-500'}/>
              
              </div>
            </div>
            <div className={!isOpen ? 'hidden' : 'block'}>
            <div className="flex flex-col pl-14 text-sm " key={idx}>         
              {route.sidebarProps.child.map((child, idx) => (
                <div key={child.displayText} className="flex my-1 gap-x-4 text-sm hover:bg-[#05161A] hover:bg-opacity-30">
                  {child.icon}
                  <Link href={child.path!} className="">{child.displayText}</Link>
                  
                </div>
              ))}

            </div>
            </div> 
            </>
            
        ) :
        (
            <div className="flex py-2 my-2 px-4 gap-x-4 text-l hover:bg-[#05161A] hover:bg-opacity-30 " key={idx}>
              {route.sidebarProps!.icon}
              <Link key={idx} href={route.path!} className="">{route.sidebarProps!.displayText}</Link>
            </div>
          )      
        )}

        

    </div>
  )
}

