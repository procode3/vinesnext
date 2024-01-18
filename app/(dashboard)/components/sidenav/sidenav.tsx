"use client"
import React, { Fragment } from 'react'
import { getAdminRoutes, Route } from '../../data/appRoutes/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import { useMediaQuery } from '@mui/material';
import { signOut, signIn, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@/components/ui/button"



type SideNavProps = {
  toggleSidenav: () => void;
};

export default function Sidenav({ toggleSidenav }: SideNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toogle = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const { data: session }: any = useSession();




  const appRoutes: Route[] = getAdminRoutes()
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xl'));
  return (
    <div id="sidenav" className="flex-col shadow-lg h-screen w-[70px] xl:w-[260px] border-r-[1px]  p-4 dark:border-gray-600  fixed  left-0  bg-slate-800 z-10  opacity-[100%] text-md items-center">


      <Link href="/" className='flex justify-center w-full py-5 text-4xl md:text-4xl text-center font-semibold cursor-pointer hover:scale-110 transition-transform'>
        <span className="hidden xl:inline text-green-600 ">Writers</span>
        <span className='text-xl xl:text-4xl font-semibold text-green-600 '>√ine</span>
      </Link>


      <div className="flex space-x-4 items-center my-auto py-0 text-gray-200 justify-evenly " >

        {!session?.user ? (

          <div className="flex flex-col gap-3 items-center h-full justify-evenly">
            <h2 className="text-xl"><span className="hidden xl:block">Hello </span>{session?.user?.user?.username} </h2>

            <Avatar className="w-[50px] xl:w-[80px] h-[50px] xl:h-[80px]">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (

          <Button variant="default" onClick={() => signIn()}>Sign In</Button>

        )
        }
      </div>
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
                  <Link href={child.path!} key={`P-${idx}`} className={`flex py-2 pl-[20px] rounded-full gap-x-2 text-gray-100 hover:bg-white hover:text-black items-center font-medium  transition ease-in-out duration-400
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
            <Link key={idx} href={route.path!} className={`flex font-light py-2 md:py-2 my-7 hover:bg-white hover:text-black flex-col xl:flex-row rounded-full justify-center md:justify-start xl:px-4 items-center  active:bg-white  active:text-black md:gap-x-5   hover:font-normal transition ease-in-out duration-400 
            ${pathname === route.path ? 'bg-white text-black' : 'text-white'}
            `}

            >
              {route.sidebarProps!.icon}
              <p className=""><span className="hidden xl:block">{route.sidebarProps!.displayText}</span></p>
            </Link>
          )
      )}

      <div className="flex flex-col space-x-4 items-center my-auto py-0 text-gray-200 justify-evenly h-[20%] " >

        {!session?.user ? (

          <div className="flex  flex-col items-center h-full justify-evenly">
            <h2>ksh. 1500</h2>
            <LogoutIcon onClick={() => signOut()} />
          </div>
        ) : (

          <Button variant="default" onClick={() => signIn()}>Sign In</Button>

        )
        }
      </div>

    </div>
  )
}
