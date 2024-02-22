
import React from 'react'
import Link from "next/link"
import { signOut, signIn, useSession } from 'next-auth/react'
import { User, getUsers, getAvatarName } from '../../../../components/data/users/usersd)/data/users/users'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import { Button } from "@/components/ui/button"
import { useMediaQuery } from '@mui/material';
require('dotenv').config();



export default function Navbar() {
  const host = process.env.HOST;
  const { data: session }: any = useSession();
  const path = `http://${host}/api/auth/signin`

  // const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xl'));
  return (
    <div className='navv flex justify-between text-md   px-5 lg:px-8 min-h-[80px] static border shadow-b-lg rounded-l spacex-2 items-center bg-white
    text-black h-[55px] opacity-100'>
      {/* <div className='flex items-center gap-4'>
        <Link href="/" className='text-3xl font-semibold cursor-pointer hover:scale-110 transition-transform'>
          <span className="hidden lg:inline">Writers</span>
          <span className='text-xl font-semibold text-[#000] '>√ine</span>
        </Link>
        {isSmallScreen && (
          <DehazeRoundedIcon className="flex xl:hidden " onClick={toggleSidenav} />
        )}
      </div> */}
      <div className="flex space-x-4 items-center my-auto py-0  " >
        {
          !session?.user ? (

            <>
              <h2>Hello {session?.user?.user?.username} </h2>

              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>Balance: ksh. 1500</h2>

              <LogoutIcon onClick={() => signOut()} />
            </>
          ) : (

            <Button variant="default" onClick={() => signIn()}>Sign In</Button>

          )
        }
      </div>


    </div>
  )
}
