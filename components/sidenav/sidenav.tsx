import React, { Fragment } from 'react';
import { getAdminRoutes, Route } from '../data/appRoutes/routes';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { options } from '@/pages/api/auth/options';
import { redirect } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from 'lucide-react';


import LoginStatus from './loginstatus'

export default async function Sidenav() {
  const pathname = '/dashboard'
  const appRoutes: Route[] = getAdminRoutes()
  const session = await getServerSession(options)
  // if (status === 'loading') return null

  if (!session?.user) {
    redirect('/signin')
    return null
  }


  //create initials from name


  return (
    <div id="sidenav" className="flex-col space-between h-screen min-w-[280px]   dark:border-gray-600  bg-slate-800 z-10  opacity-[100%] text-md items-center">


      {/* <Link href="/" className='flex justify-center w-full py-5 text-4xl md:text-4xl text-center font-semibold cursor-pointer hover:scale-110 transition-transform'>
        <span className="hidden xl:inline text-green-600 ">Writers</span>
        <span className='text-xl xl:text-4xl font-semibold text-green-600 '>√ine</span>
      </Link> */}


      <div className="flex space-x-4  min-w-full  bg-slate-700  my-auto py-5 px-3 text-gray-200 " >

        {session?.user ? (

          <div className="flex items-center gap-4 h-full justify-between text-white">
            <Avatar className="w-[25px] xl:w-[40px] h-[25px] xl:h-[40px]">
              <AvatarFallback>{(session?.user?.name!.split(" ") || []).slice(0, 2).map((word: string) => word[0]).join("")
              }</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-l text-left text-nowrap">
              <h2 >
                {session?.user?.name}
              </h2>
              <p className='text-xs text-slate-300'>
                {session?.user?.email}
              </p>
            </div>
          </div>
        ) : (

          <div className="flex gap-3 items-center  h-full justify-evenly">
            <Avatar className="w-[25px] xl:w-[40px] h-[25px] xl:h-[40px]">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-l space-y-2 text-left text-nowrap">
              <Skeleton className="h-4 w-[150px] rounded-sm" />
              <Skeleton className="h-4 w-150px] rounded-sm" />
            </div>
          </div>
        )
        }
      </div>
      {appRoutes.map((route, idx) =>
        route.sidebarProps.child ? (
          <div key={idx} className=''>
            <div className="flex flex-row w-full items-center  my-2 rounded-3xl text-white hover:border-gray-50 hover:bg-white hover:text-black">
              <Link key={route.path} href={route.path!} className={`w-full rounded-full border border-transparent flex flex-col md:flex-row  py-4  justify-between px-16 transition ease-in-out duration-400 gap-[10px] ${pathname === route.path ? 'bg-gray-100 text-black' : ''}`}>
                <div className="flex  gap-2">
                  {route.sidebarProps!.icon}
                  <p className="">{route.sidebarProps!.displayText}</p>
                </div>
                {/* <KeyboardArrowDownOutlinedIcon onClick={toogle} className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} w-1/8 border-gray-700 rounded-lg  mx-2 transition-transform duration-300 hover:scale-110`} /> */}
              </Link>
            </div>
            <div className='block'>
              <div className="flex flex-col pl-4  gap-[10px]  " key={idx}>
                {route.sidebarProps.child.map((child, idx) => (
                  <Link href={child.path!} key={`P-${idx}`} className={`flex py-2 pl-[20px] rounded-full gap-x-2 text-gray-100 hover:border-gray-50 hover:bg-white hover:text-black items-center font-medium  transition ease-in-out duration-400
                  ${pathname === child.path ? 'bg-purple-600 text-white' : ''}`}>
                    {/* {child.icon} */}
                    <p className="">{child.displayText}</p>

                  </Link>
                ))}
              </div>
            </div>
          </div>

        ) :
          (
            <Link key={idx} href={route.path!} className={`flex font-light p-2 md:py-2 m-5 text-sm  hover:border-gray-50 hover:bg-white    hover:text-black flex-col xl:flex-row rounded-full justify-center md:justify-start xl:px-4 items-center  active:bg-white  active:text-black md:gap-x-5   hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'bg-white text-black' : 'text-white'}
            `}

            >
              {route.sidebarProps!.icon}
              <p className=""><span className="hidden xl:block">{route.sidebarProps!.displayText}</span></p>
            </Link>
          )
      )}

      <LoginStatus session={session} />



    </div >
  )
}
